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
  Layer,
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
import { ActivatedRoute } from '@angular/router';

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
  public currentStrat: Strat;
  public userInfos: UserInfos;

  public width: number = 0;
  public height: number = 0;
  private draggingAgent: Agent;
  private draggingImage: Image;

  private CTRLPressed: boolean;

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

    this.store.select(StratStore.getSelectedMap).subscribe((selectedMap) => {
      if (selectedMap) {
        if (this.currentMap) {
          if (this.currentMap !== selectedMap) {
            this.openConfirmationDialog(selectedMap);
          } else {
          }
        } else {
          this.currentStrat = this.createNewStrat(selectedMap);
          this.store.dispatch(
            StratStore.SelectFloor({
              floor: selectedMap ? selectedMap.floors[0] : null,
            })
          );
        }
      } else {
        this.store.dispatch(
          StratStore.SelectFloor({
            floor: selectedMap ? selectedMap.floors[0] : null,
          })
        );
        this.store.dispatch(StratStore.CreateStrat({ strat: null }));
      }
      this.currentMap = selectedMap;
    });

    this.store.select(StratStore.getSelectedFloor).subscribe((floor) => {
      this.currentFloor = floor;
    });

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

    this.store.select(StratStore.getCurrentStrat).subscribe((currentStrat) => {
      this.currentStrat = currentStrat;
      if (currentStrat) {
        console.log('currentStrat map id', currentStrat.mapId);

        this.store
          .select(StratStore.getMapById, currentStrat.mapId)
          .subscribe((map) => {
            console.log('SelectMAp', map);
            this.store.dispatch(StratStore.SelectMap({ map }));
          });
      }
    });

    this.store
      .select(StratStore.getCurrentCanvasState)
      .subscribe((canvasState) => {
        this.updateStratFromCanvasState(canvasState);
      });
  }

  ngAfterViewInit(): void {}

  updateStratFromCanvasState(currentCanvasState: string): void {
    console.log('updateStratFromCanvasState');
    if (this.currentStrat && currentCanvasState && this.currentFloor) {
      console.log('In first if');
      const layer = this.currentStrat.layers.find(
        (layer) => layer.floorId === this.currentFloor._id
      );
      if (layer) {
        console.log('In first layer');
        layer.canvasState = currentCanvasState;
      } else {
        console.log('In else layer');
        // ReadOnly
        this.currentStrat.layers.push({
          canvasState: currentCanvasState,
          floorId: this.currentFloor._id,
        } as Layer);
      }
    }
  }

  openConfirmationDialog(selectedMap: Map): void {
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
  }

  /**
   * Create new Strat for this map
   */
  createNewStrat(selectedMap: Map): Strat {
    return {
      createdAt: new Date(),
      name: `${selectedMap.name} - ${new Date().toLocaleDateString()}`,
      description: '',
      lastModifiedAt: new Date(),
      userId: this.userInfos?.userId,
      votes: 0,
      layers: [],
      mapId: selectedMap._id,
      mapName: selectedMap.name,
      isPublic: false,
    };
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

  public openAgentsPanel() {
    this.store.dispatch(StratStore.showAgentsPanel());
  }

  public openGadgetsPanel() {
    this.store.dispatch(StratStore.showGadgetsPanel());
  }

  public openDrawingPanel() {
    this.store.dispatch(StratStore.showDrawingPanel());
  }

  public openGalleryPanel() {
    this.store.dispatch(StratStore.showGalleryPanel());
  }

  public onSelect() {
    this.store.dispatch(
      StratStore.SetDrawingMode({ drawingMode: DrawingMode.Selection })
    );
  }

  public onDrag() {
    this.store.dispatch(
      StratStore.SetDrawingMode({ drawingMode: DrawingMode.Dragging })
    );
  }

  public onDraw() {
    this.store.dispatch(
      StratStore.SetDrawingMode({ drawingMode: DrawingMode.Drawing })
    );
  }

  public onSave() {
    if (this.currentStrat) {
      const dialogRef = this.dialog.open(StratSavingDialogComponent, {
        width: '400px',
        hasBackdrop: true,
        data: { strat: this.currentStrat },
        panelClass: ['strat-saving-dialog'],
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe((strat) => {
        console.log('afterClosed', strat);

        if (strat) {
          this.currentStrat = strat;
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
