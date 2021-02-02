import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
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
  Strat,
  UserInfos,
  DrawerAction,
  PolyLineAction,
} from '@strat-editor/data';
import * as StratStore from '@strat-editor/store';
import { DrawingEditorComponent } from '@strat-editor/drawing-editor';
import { KEY_CODE } from '../../../helpers/key_code';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { StratSavingDialogComponent } from '../../molecules/strat-saving-dialog/strat-saving-dialog.component';
import {
  DualChoiceDialogComponent,
  DualChoiceDialogData,
} from '../../molecules/dual-choice-dialog/dual-choice-dialog.component';

@Component({
  selector: 'strat-editor-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit, AfterViewInit {
  @ViewChild('drawerEditor') drawerEditor: DrawingEditorComponent;

  public $maps: Observable<Map[]>;
  public currentMap: Map;
  public currentFloor: Floor;
  public userInfos: UserInfos;

  public width: number = 0;
  public height: number = 0;
  private draggingAgent: Agent;
  private draggingImage: Image;

  private CTRLPressed: boolean;
  public savedStrat: Strat;

  public $drawingMode: Observable<DrawingMode>;
  public $loadedStrat: Observable<Strat>;
  private canvasLoading: boolean;

  constructor(
    private store: Store<StratStore.StratEditorState>,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.$maps = this.store.select(StratStore.getAllMaps);
    this.$drawingMode = this.store.select(StratStore.getDrawingMode);
    this.$loadedStrat = this.store.select(StratStore.getLoadedStrat);
    this.store.dispatch(StratStore.FetchMaps());
    this.store.dispatch(StratStore.FetchAgents());
    this.store.dispatch(StratStore.FetchDrawerActions());
    this.store.dispatch(StratStore.FetchFontNames());
    this.store.dispatch(StratStore.SetColor({ color: new DrawerColor() }));
    this.store.dispatch(
      StratStore.SetDrawerAction({ action: new PolyLineAction() })
    );
    this.store
      .select(StratStore.canvasStateIsLoading)
      .subscribe((canvasLoading) => {
        this.canvasLoading = canvasLoading;
      });
  }

  ngAfterViewInit(): void {
    this.store.select(StratStore.getSelectedAction).subscribe((selected) => {
      if (this.currentFloor) {
        this.store.dispatch(StratStore.closeRight());
      }
    });
    this.store.select(StratStore.getDraggedAgent).subscribe((agent) => {
      if (agent) {
        this.draggingAgent = agent;
      }
    });
    this.store.select(StratStore.getDraggedImage).subscribe((image) => {
      if (image) {
        this.draggingImage = image;
      }
    });

    this.store.select(StratStore.getUserInfos).subscribe((userInfos) => {
      this.userInfos = userInfos;
    });

    this.store.select(StratStore.getSelectedMap).subscribe((selectedMap) => {
      if (this.currentMap && selectedMap && this.currentMap != selectedMap) {
        const dialogRef = this.dialog.open(DualChoiceDialogComponent, {
          width: '400px',
          hasBackdrop: true,
          data: {
            title: 'Changing Map',
            description:
              'You have unsave changes for this map, you will loose them if you continue.',
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Continue',
          } as DualChoiceDialogData,
          panelClass: ['strat-saving-dialog'],
          disableClose: true,
        });

        dialogRef.afterClosed().subscribe((confirm) => {
          if (confirm) {
            this.store.dispatch(
              StratStore.SelectFloor({
                floor: selectedMap ? selectedMap.floors[0] : null,
              })
            );
          }
        });
      } else {
        this.store.dispatch(
          StratStore.SelectFloor({
            floor: selectedMap ? selectedMap.floors[0] : null,
          })
        );
        this.currentMap = selectedMap;
      }
    });

    this.store.select(StratStore.getSelectedFloor).subscribe((floor) => {
      this.currentFloor = floor;
    });
  }

  onMapSelected(map: Map) {
    this.store.dispatch(StratStore.SelectMap({ map: map }));
  }

  onFloorSelected(floor: Floor) {
    this.store.dispatch(StratStore.SelectFloor({ floor: floor }));
  }

  onDrawingActionSelected(action: DrawerAction) {
    this.store.dispatch(StratStore.SetDrawerAction({ action }));
    this.store.dispatch(StratStore.closeRight());
  }

  @HostListener('document:keyup', ['$event'])
  keyUp(event: KeyboardEvent) {
    switch (event.key.toLocaleLowerCase()) {
      case KEY_CODE.DELETE:
        this.drawerEditor.deleteActiveObject();
        break;
      case KEY_CODE.ESCAPE:
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
        if (this.CTRLPressed && !this.canvasLoading) {
          this.store.dispatch(StratStore.UndoCanvasState());
        }
        break;
      case KEY_CODE.Y:
        if (this.CTRLPressed && !this.canvasLoading) {
          this.store.dispatch(StratStore.RedoCanvasState());
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
    this.store.dispatch(StratStore.showAgentsPanel());
  }

  openGadgetsPanel() {
    this.store.dispatch(StratStore.showGadgetsPanel());
  }

  openDrawingPanel() {
    this.store.dispatch(StratStore.showDrawingPanel());
  }

  openGalleryPanel() {
    this.store.dispatch(StratStore.showGalleryPanel());
  }

  public onSelect() {
    this.drawerEditor.enableSelectionMode();
  }

  public onDrag() {
    this.drawerEditor.enableDraggingMode();
  }

  public onDraw() {
    this.drawerEditor.enableDrawMode();
  }

  public onSave() {
    if (this.savedStrat) {
    } else {
      const strat: Strat = {
        createdAt: new Date(),
        name: `${this.currentMap.name} - ${new Date().toLocaleDateString()}`,
        description: '',
        lastModifiedAt: new Date(),
        createdBy: this.userInfos?.userId,
        votes: 0,
        layers: [],
        mapId: this.currentMap._id,
        mapName: this.currentMap.name,
        isPublic: false,
      };
      const dialogRef = this.dialog.open(StratSavingDialogComponent, {
        width: '400px',
        hasBackdrop: true,
        data: { strat },
        panelClass: ['strat-saving-dialog'],
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe((strat) => {
        if (strat) {
          this.store.dispatch(StratStore.SaveStrat({ strat }));
        }
      });
    }
  }

  public onShowInfos() {}

  public onOpenStrat() {}

  public onDeleteStrat() {}

  public stopWheelEvent($event) {
    $event.preventDefault();
    $event.stopPropagation();
  }
}
