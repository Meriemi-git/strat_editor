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
import {
  Agent,
  Floor,
  Map,
  Image,
  DrawerColor,
  DrawingMode,
} from '@strat-editor/data';
import * as Actions from '../../../store/actions';
import * as Selectors from '../../../store/selectors';
import { StratEditorState } from '../../../store/reducers';
import {
  DrawerAction,
  DrawingEditorComponent,
  PolyLineAction,
} from '@strat-editor/drawing-editor';
import { KEY_CODE } from '../../../helpers/key_code';
import { Observable } from 'rxjs';

@Component({
  selector: 'strat-editor-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit, AfterViewInit {
  @ViewChild('container') container: ElementRef;
  @ViewChild('drawerEditor') drawerEditor: DrawingEditorComponent;

  public selectedFloor: Floor;
  public $maps: Observable<Map[]>;
  public width: number = 0;
  public height: number = 0;
  private canvasStateLoading: boolean;
  private draggingAgent: Agent;
  private draggingImage: Image;

  private previousAction: DrawerAction;
  private CTRLPressed: boolean;

  public $drawingMode: Observable<DrawingMode>;

  constructor(
    private store: Store<StratEditorState>,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.$maps = this.store.select(Selectors.getAllMaps);
    this.$drawingMode = this.store.select(Selectors.getDrawingMode);
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
      if (this.selectedFloor) {
        this.store.dispatch(Actions.closeRight());
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
    this.store.select(Selectors.getSelectedMap).subscribe((map) => {
      this.store.dispatch(
        Actions.SelectFloor({ floor: map ? map.floors[0] : null })
      );
    });

    this.store.select(Selectors.getSelectedFloor).subscribe((floor) => {
      this.selectedFloor = floor;
      if (floor) {
        this.displayCanvas();
      } else {
        this.drawerEditor.close();
      }
    });
  }

  onMapSelected(map: Map) {
    this.store.dispatch(Actions.SelectMap({ map: map }));
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

  onDrawingModeChanged(drawingMode: DrawingMode) {
    this.store.dispatch(Actions.SetDrawingMode({ drawingMode }));
  }

  displayCanvas() {
    this.resizeCanvas();
    this.drawerEditor.setBackgroundImageFromUrl(this.selectedFloor);
  }

  resizeCanvas() {
    this.width = window.innerWidth;
    this.height = window.innerHeight - 60;
    this.drawerEditor.resize(this.width, this.height);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.displayCanvas();
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
      case KEY_CODE.CTRL:
        this.CTRLPressed = false;
        break;
      default:
    }
  }

  @HostListener('document:keydown', ['$event'])
  keyDown(event: KeyboardEvent) {
    switch (event.key.toLocaleLowerCase()) {
      case KEY_CODE.CTRL:
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
