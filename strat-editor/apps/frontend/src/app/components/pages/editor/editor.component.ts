import { Component, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Agent, Map } from '@strat-editor/data';
import { Observable, Subscription } from 'rxjs';
import * as Actions from '../../../store/actions';
import * as Selectors from '../../../store/selectors';
import { StratEditorState } from '../../../store/reducers';
import { MapPanelComponent } from '../../molecules/map-panel/map-panel.component';
import { DrawingAction } from '@strat-editor/drawer';
//import { DrawingAction } from '../../../drawer/actions';
import { take } from 'rxjs/operators';
import { KEY_CODE } from '../../../helpers/key_code'

@Component({
  selector: 'strat-editor-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  leftIsOpened: boolean;
  rightIsOpened: boolean;
  $agents : Observable<Agent[]>
  $maps : Observable<Map[]>
  isMapSelected : boolean;
  actionSubscription : Subscription;

  @ViewChild("mapPanel") mapPanel : MapPanelComponent;

  constructor(private store : Store<StratEditorState>,private renderer : Renderer2){}

  ngOnInit(): void {
    this.store.select(Selectors.isLeftSidenavOpened).subscribe(isOpened => {
      this.leftIsOpened = isOpened
    })
    this.store.select(Selectors.isRightSidenavOpened).subscribe(isOpened => {
      this.rightIsOpened = isOpened
    })
    this.$agents = this.store.select(Selectors.selectAllAgents);
    this.$maps = this.store.select(Selectors.selectAllMaps);
    this.store.dispatch(Actions.FetchAgents());
    this.store.dispatch(Actions.FetchMaps());
  }

  toggleLeftSidenav(){
    this.store.dispatch(Actions.toggleLeft())
  }

  toggleRightSidenav(){
    this.store.dispatch(Actions.toggleRight())
  }

  onMapSelected(map : Map){
    this.store.dispatch(Actions.SelectMap({selectedMap : map}));
    this.isMapSelected = true;
  }

  onCloseLeftSidenav(){
    this.store.dispatch(Actions.toggleLeft())
  }

  onCloseRightSidenav(){
    this.store.select(Selectors.isRightSidenavOpened).pipe(take(1)).subscribe(isOpen => {
      if(isOpen){
        this.store.dispatch(Actions.toggleRight())
      }})
  }

  onDrawingActionSelected(action : DrawingAction){
    this.store.dispatch(Actions.SelectDrawingAction({action}));
    this.store.dispatch(Actions.toggleRight());
    //this.mapPanel.updatePointerIcon(action.getIconUrl());
  }

  onCanvasClicked(){
    this.actionSubscription = this.store.select(Selectors.getSelectedAction).pipe(take(1)).subscribe(selected => {
      if(selected){
        this.store.dispatch(Actions.PerformSelectedDrawingAction({action:selected}));
        this.mapPanel.setDrawer(selected.drawer);
      }
    });
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.key === KEY_CODE.RIGHT_ARROW) {
      this.store.dispatch(Actions.RedoDrawingAction());
    }

    if (event.key === KEY_CODE.LEFT_ARROW) {
      this.store.dispatch(Actions.UndoDrawingAction());
    }

    if (event.key === KEY_CODE.ESCAPE) {
      this.store.dispatch(Actions.UnSelectDrawingAction());
    }
  }
}
