import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Agent, Floor, Map, Image } from '@strat-editor/data';
import * as Actions from '../../../store/actions';
import * as Selectors from '../../../store/selectors';
import { StratEditorState } from '../../../store/reducers';
import {
  DrawerColor,
  DrawerAction,
  DrawingEditorComponent,
  PolyLineAction,
  SelectionAction,
  DraggingAction,
} from '@strat-editor/drawing-editor';
import { KEY_CODE } from '../../../helpers/key_code';
import { environment } from 'apps/frontend/src/environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'strat-editor-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit, AfterViewInit {
  @ViewChild('container') container: ElementRef;
  @ViewChild('drawerEditor') drawerEditor: DrawingEditorComponent;

  public selectedMap: Map;
  public selectedFloor: Floor;
  public $maps: Observable<Map[]>;
  public width: number;
  public height: number;
  private canvasStateLoading: boolean;
  private draggingAgent: Agent;
  private draggingImage: Image;

  private previousAction: DrawerAction;
  private CTRLPressed: boolean;

  constructor(
    private store: Store<StratEditorState>,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.$maps = this.store.select(Selectors.getAllMaps);
    this.store.dispatch(Actions.FetchMaps());
    this.store.dispatch(Actions.FetchAgents());
    this.store.dispatch(Actions.FetchDrawerActions());
    this.store.dispatch(Actions.FetchFontNames());
    this.store.dispatch(Actions.SetColor({ color: new DrawerColor() }));
    this.store.dispatch(
      Actions.SetDrawerAction({ action: new PolyLineAction() })
    );
  }

  ngAfterViewInit(): void {
    this.store.select(Selectors.getSelectedAction).subscribe((selected) => {
      if (this.selectedMap) {
        this.store.dispatch(Actions.closeRight());
      }
      if (
        !(selected instanceof SelectionAction) &&
        !(selected instanceof DraggingAction)
      ) {
        this.previousAction = selected;
      }
      this.drawerEditor.callAction(selected);
    });
    this.store.select(Selectors.getColor).subscribe((color) => {
      this.drawerEditor.setColor(color);
    });
    this.store.select(Selectors.getSelectedOption).subscribe((option) => {
      this.drawerEditor.setDrawerOptions(option);
    });
    this.store.select(Selectors.getFontFamily).subscribe((fontFamily) => {
      this.drawerEditor.setFontFamily(fontFamily);
    });
    this.store.select(Selectors.getFontSize).subscribe((fontSize) => {
      this.drawerEditor.setFontSize(fontSize);
    });
    this.store
      .select(Selectors.getCurrentCanvasState)
      .subscribe((canvasState) => {
        if (canvasState) {
          const state = JSON.parse(canvasState);
          this.drawerEditor.setCanvasState(state);
        }
      });
    this.store.select(Selectors.getDraggedAgent).subscribe((agent) => {
      if (agent) {
        this.draggingAgent = agent;
      }
    });
    this.store.select(Selectors.getDraggedImage).subscribe((image) => {
      if (image) {
        this.draggingImage = image;
      }
    });
  }

  onMapSelected(map: Map) {
    this.selectedMap = map;
    this.selectedFloor = map.floors[1];
    this.store.dispatch(Actions.SelectMap({ selectedMap: map }));
    this.displayCanvas();
  }

  onDrawingActionSelected(action: DrawerAction) {
    this.store.dispatch(Actions.SetDrawerAction({ action }));
    this.store.dispatch(Actions.closeRight());
  }

  onStateModified(state: string) {
    const canvasState = JSON.stringify(state);
    this.store.dispatch(Actions.SaveCanvasState({ canvasState }));
  }

  onCanvasStateLoaded() {
    this.canvasStateLoading = false;
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
    if (this.selectedFloor) {
      this.drawerEditor.setBackgroundImageFromUrl(
        environment.floorImageApiUrl + this.selectedFloor.image
      );
    }
  }

  @HostListener('document:keyup', ['$event'])
  keyUp(event: KeyboardEvent) {
    switch (event.key.toLocaleLowerCase()) {
      case KEY_CODE.DELETE:
        this.drawerEditor.deleteActiveObject();
        break;
      case KEY_CODE.ESCAPE:
        this.store.dispatch(
          Actions.SetDrawerAction({ action: this.previousAction })
        );
        this.drawerEditor.resetView();
        break;
      case KEY_CODE.CTRL:
        if (this.CTRLPressed) {
          this.store.dispatch(
            Actions.SetDrawerAction({ action: this.previousAction })
          );
        }
        this.CTRLPressed = false;
        break;
      case KEY_CODE.A:
        if (this.CTRLPressed) {
          this.drawerEditor.selectAllObjects();
          if (window.getSelection) {
            if (window.getSelection().empty) {
              window.getSelection().empty();
            } else if (window.getSelection().removeAllRanges) {
              window.getSelection().removeAllRanges();
            }
          }
        }
        break;
      case KEY_CODE.Z:
        if (this.CTRLPressed && !this.canvasStateLoading) {
          this.store.dispatch(Actions.UndoCanvasState());
        }
        break;
      case KEY_CODE.Y:
        if (this.CTRLPressed && !this.canvasStateLoading) {
          this.store.dispatch(Actions.RedoCanvasState());
        }
        break;
      default:
    }
  }

  @HostListener('document:keydown', ['$event'])
  keyDown(event: KeyboardEvent) {
    switch (event.key.toLocaleLowerCase()) {
      case KEY_CODE.CTRL:
        if (!this.CTRLPressed) {
          this.store.dispatch(
            Actions.SetDrawerAction({ action: new SelectionAction() })
          );
        }
        this.CTRLPressed = true;
        break;
    }
  }

  @HostListener('dragstart', ['$event'])
  onWindowDragStart(event: any) {
    this.cdr.detach();
  }

  @HostListener('dragend', ['$event'])
  onWindowDragEnd(event: any) {
    this.cdr.reattach();
  }

  @HostListener('drop', ['$event'])
  onwindowDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (this.draggingAgent) {
      this.drawerEditor.drawAgent(
        this.draggingAgent,
        event.layerX,
        event.layerY
      );
      this.draggingAgent = null;
    }
    if (this.draggingImage) {
      this.drawerEditor.drawImage(
        this.draggingImage,
        event.layerX,
        event.layerY
      );
      this.draggingImage = null;
    }
  }

  openAgentsPanel() {
    this.store.dispatch(Actions.showAgentsPanel());
  }

  openGadgetsPanel() {
    this.store.dispatch(Actions.showGadgetsPanel());
  }

  openDrawingPanel() {
    this.store.dispatch(Actions.showDrawingPanel());
  }

  openGalleryPanel() {
    this.store.dispatch(Actions.showGalleryPanel());
  }
}
