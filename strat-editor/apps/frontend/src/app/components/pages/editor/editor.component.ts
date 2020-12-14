import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Floor, Map } from '@strat-editor/data';
import * as Actions from '../../../store/actions';
import * as Selectors from '../../../store/selectors';
import { StratEditorState } from '../../../store/reducers';
import {
  Color,
  DrawerAction,
  DrawingEditorComponent,
  PolyLineAction,
} from '@strat-editor/drawing-editor';
import { take } from 'rxjs/operators';
import { KEY_CODE } from '../../../helpers/key_code';
import { environment } from 'apps/frontend/src/environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'strat-editor-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit, AfterViewInit {
  leftIsOpened: boolean;
  rightIsOpened: boolean;
  selectedMap: Map;
  selectedFloor: Floor;
  $maps: Observable<Map[]>;
  width: number;
  height: number;

  @ViewChild('container') container: ElementRef;
  @ViewChild('drawerEditor') drawerEditor: DrawingEditorComponent;

  constructor(private store: Store<StratEditorState>) {}

  ngOnInit(): void {
    this.store.select(Selectors.isLeftSidenavOpened).subscribe((isOpened) => {
      this.leftIsOpened = isOpened;
    });
    this.store.select(Selectors.isRightSidenavOpened).subscribe((isOpened) => {
      this.rightIsOpened = isOpened;
    });
    this.store.dispatch(Actions.FetchAgents());
    this.store.dispatch(Actions.FetchMaps());
    this.store.dispatch(Actions.FetchDrawerActions());
    this.$maps = this.store.select(Selectors.selectAllMaps);
    this.store.dispatch(Actions.SetColorAction({ color: new Color() }));
    this.store.dispatch(
      Actions.PerformDrawerAction({ action: new PolyLineAction() })
    );
  }

  ngAfterViewInit(): void {
    this.store.select(Selectors.getSelectedAction).subscribe((selected) => {
      if (this.selectedMap) {
        this.toggleRightSidenav();
      }
      this.drawerEditor.setDrawerByAction(selected);
    });
    this.store.select(Selectors.getColor).subscribe((color) => {
      this.drawerEditor.setColor(color);
    });
  }

  onMapSelected(map: Map) {
    this.selectedMap = map;
    this.selectedFloor = map.floors[1];
    this.store.dispatch(Actions.SelectMap({ selectedMap: map }));
    this.displayCanvas();
  }

  onCloseLeftSidenav() {
    this.store.dispatch(Actions.toggleLeft());
  }

  onCloseRightSidenav() {
    this.store
      .select(Selectors.isRightSidenavOpened)
      .pipe(take(1))
      .subscribe((isOpen) => {
        if (isOpen) {
          this.store.dispatch(Actions.toggleRight());
        }
      });
  }

  onDrawingActionSelected(action: DrawerAction) {
    this.store.dispatch(Actions.PerformDrawerAction({ action }));
    this.store.dispatch(Actions.toggleRight());
  }

  displayCanvas() {
    this.width = (window.innerWidth * 98) / 100;
    this.height = this.container.nativeElement.clientHeight;
    this.drawerEditor.resize(this.width, this.height);
    this.drawerEditor.setBackgroundImageFromUrl(
      environment.floorImageApiUrl + this.selectedFloor.image
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.width = window.innerWidth;
    this.height = this.container.nativeElement.clientHeight;
    this.drawerEditor.resize(this.width, this.height);
    this.drawerEditor.setBackgroundImageFromUrl(
      environment.floorImageApiUrl + this.selectedFloor.image
    );
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.key === KEY_CODE.RIGHT_ARROW) {
      this.store.dispatch(Actions.RedoDrawerAction());
    }

    if (event.key === KEY_CODE.LEFT_ARROW) {
      this.store.dispatch(Actions.UndoDrawerAction());
    }

    if (event.key === KEY_CODE.ESCAPE) {
      this.store.dispatch(Actions.UnSelectDrawerAction());
    }
  }

  toggleLeftSidenav() {
    this.store.dispatch(Actions.toggleLeft());
  }

  toggleRightSidenav() {
    this.store.dispatch(Actions.toggleRight());
  }
}
