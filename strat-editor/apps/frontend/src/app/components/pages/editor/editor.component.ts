import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Floor,
  Map,
  DrawerColor,
  DrawingMode,
  Strat,
  UserInfos,
  DrawerAction,
  PolyLineAction,
  Layer,
  StratAction,
  NotificationType,
  DrawingToolbarAction,
  DrawerActionType,
} from '@strat-editor/data';
import * as StratStore from '@strat-editor/store';
import { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {
  StratInfosDialogData,
  StratSavingDialogComponent,
} from '../../molecules/strat-saving-dialog/strat-saving-dialog.component';
import {
  DualChoiceDialogComponent,
  DualChoiceDialogData,
} from '../../molecules/dual-choice-dialog/dual-choice-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import {
  LoadStrat,
  LoadStratSuccess,
  SelectFloor,
  SetCurrentLayer,
} from '@strat-editor/store';
import { takeUntil } from 'rxjs/operators';
import { NotificationService } from '@strat-editor/services';

@Component({
  selector: 'strat-editor-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit, OnDestroy {
  public $maps: Observable<Map[]>;
  public $drawingMode: Observable<DrawingMode>;
  public selectedMap: Map;
  public selectedFloor: Floor;
  public currentStrat: Strat;
  public userInfos: UserInfos;

  public width: number = 0;
  public height: number = 0;
  private unsubscriber = new Subject();

  constructor(
    private store: Store<StratStore.StratEditorState>,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    this.store.dispatch(StratStore.ClearStratState());
    this.store.dispatch(StratStore.ClearMapState());
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

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
      .select(StratStore.getUserInfos)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((userInfos) => {
        this.userInfos = userInfos;
      });

    this.activatedRoute.params
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((params) => {
        if (params.stratId) {
          this.loadStrat(params.stratId);
        }
      });

    this.store
      .select(StratStore.getSelectedMap)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((map) => {
        this.manageMap(map);
        this.selectedMap = map;
      });

    this.store
      .select(StratStore.getSelectedFloor)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((floor) => {
        this.manageFloor(floor);
      });

    this.store
      .select(StratStore.getStratAndAction)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((stratAndAction) => {
        this.currentStrat = stratAndAction.strat;
        this.manageStratByAction(stratAndAction);
      });

    this.store
      .select(StratStore.getCanvas)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((canvas) => {
        if (canvas && this.selectedFloor) {
          this.store.dispatch(
            StratStore.UpdateStratLayer({
              canvas,
              floorId: this.selectedFloor._id,
              floorName: this.selectedFloor.name,
            })
          );
        }
      });
  }

  private manageFloor(floor: Floor) {
    this.selectedFloor = floor;
    if (this.currentStrat) {
      const layer = this.currentStrat.layers.find(
        (layer) => layer.floorId === floor._id
      );
      this.store.dispatch(
        SetCurrentLayer({ layer: layer ?? this.currentStrat.layers[0] })
      );
    } else {
      // TODO what i must do ???
    }
  }

  private manageMap(map: Map) {
    if (map && map != this.selectedMap) {
      if (!this.currentStrat) {
        const newStrat = this.createNewStrat(map);
        this.store.dispatch(StratStore.CreateStrat({ strat: newStrat }));
      } else {
        if (this.selectedMap && this.selectedMap._id != map._id) {
          this.askForSwitchMap(map);
        } else {
          const defaultLayer = this.currentStrat.layers[0];
          this.store
            .select(StratStore.getFloorById, defaultLayer.floorId)
            .subscribe((floor) => {
              if (floor) {
                this.store.dispatch(SelectFloor({ floor }));
              }
            });
        }
      }
    }
  }

  private manageStratByAction(stratAndAction: any) {
    switch (stratAndAction.action) {
      case StratAction.LOAD:
        this.store
          .select(StratStore.getMapById, stratAndAction.strat.mapId)
          .subscribe((map) => {
            if (map) {
              this.store.dispatch(StratStore.SelectMap({ map }));
            }
          });
        break;
      case StratAction.CREATE:
        const defaultLayer = stratAndAction.strat.layers[0];
        this.store
          .select(StratStore.getFloorById, defaultLayer.floorId)
          .subscribe((floor) => {
            if (floor) {
              this.store.dispatch(SelectFloor({ floor }));
            }
          });
        break;
      case StratAction.SAVE:
        console.log('e Manage Strat SAVE');
        this.store.dispatch(
          StratStore.SaveStrat({ strat: stratAndAction.strat })
        );
        break;
      case StratAction.UPDATE_INFOS:
        console.log('e Manage Strat UPDATE_INFOS');
        break;
      case StratAction.UPDATE_LAYER:
        console.log('e Manage Strat UPDATE_LAYER');
        // TODO save in local storage
        break;
      case StratAction.DELETE:
        console.log('e Manage Strat DELETE');
        this.store.dispatch(StratStore.ClearStratState());
        this.store.dispatch(StratStore.ClearCanvasState());
        this.store.dispatch(StratStore.ClearMapState());
        this.router.navigateByUrl('editor');
        // TODO save in local storage
        break;
      default:
        break;
    }
  }

  /**
   * Load strat by id
   * @param stratId Strat id to be laoded
   */
  private loadStrat(stratId: string) {
    this.store.select(StratStore.getStratById, stratId).subscribe((strat) => {
      if (strat) {
        this.store.dispatch(LoadStratSuccess({ strat }));
      } else {
        this.store.dispatch(LoadStrat({ stratId }));
      }
    });
  }

  private askForSwitchMap(map: Map): void {
    const dialogRef = this.dialog.open(DualChoiceDialogComponent, {
      width: '400px',
      hasBackdrop: true,
      data: {
        title: 'Changing Map',
        description: [
          'You have unsave changes for this map, you will loose them if you continue.',
        ],
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Continue',
      } as DualChoiceDialogData,
      panelClass: ['strat-saving-dialog'],
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.router.navigateByUrl('editor');
        const newStrat = this.createNewStrat(map);
        this.store.dispatch(StratStore.CreateStrat({ strat: newStrat }));
      } else {
        this.store.dispatch(StratStore.SelectMap({ map: this.selectedMap }));
      }
    });
  }

  private askForDeleteStrat(strat: Strat): void {
    const dialogRef = this.dialog.open(DualChoiceDialogComponent, {
      width: '400px',
      hasBackdrop: true,
      data: {
        title: 'Deleting strat',
        description: ['Do you really want to delete this strat :', strat.name],
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Delete',
      } as DualChoiceDialogData,
      panelClass: ['strat-saving-dialog'],
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.store.dispatch(StratStore.DeleteStrat({ stratId: strat._id }));
      }
    });
  }

  private askForSaveStrat() {
    if (this.currentStrat) {
      const dialogRef = this.dialog.open(StratSavingDialogComponent, {
        width: '400px',
        hasBackdrop: true,
        data: {
          name: this.currentStrat.name,
          description: this.currentStrat.description,
          isPublic: this.currentStrat.isPublic,
        },
        panelClass: ['strat-saving-dialog'],
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe((stratInfos: StratInfosDialogData) => {
        if (stratInfos) {
          this.store.dispatch(StratStore.UpdateStratInfosAndSave(stratInfos));
        }
      });
    }
  }

  /**
   * Create new Strat for this map
   */
  createNewStrat(selectedMap: Map): Strat {
    return {
      createdAt: new Date(),
      name: `${selectedMap.name} - ${new Date().toLocaleDateString()}`,
      description: 'Describe your strat here...',
      lastModifiedAt: new Date(),
      userId: this.userInfos?.userId,
      votes: 0,
      layers: selectedMap.floors.map(
        (floor) =>
          ({
            floorName: floor.name,
            floorId: floor._id,
            canvasState: null,
          } as Layer)
      ),
      mapId: selectedMap._id,
      mapName: selectedMap.name,
      isPublic: false,
    };
  }

  onMapSelected(map: Map) {
    this.store.dispatch(StratStore.SelectMap({ map }));
  }

  onFloorSelected(floor: Floor) {
    this.store.dispatch(StratStore.SelectFloor({ floor: floor }));
  }

  onDrawingActionSelected(action: DrawerAction) {
    this.store.dispatch(StratStore.SetDrawerAction({ action }));
    this.store.dispatch(StratStore.closeRight());
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

  public onSelectToolbarAction(toolbarAction: DrawingToolbarAction) {
    switch (toolbarAction) {
      case DrawingToolbarAction.CENTER_MAP:
        break;
      case DrawingToolbarAction.CLEAR_STRAT:
        this.store.dispatch(
          StratStore.SetDrawerAction({
            action: {
              type: DrawerActionType.MISC,
              name: 'Clear',
            } as DrawerAction,
          })
        );
        break;
      case DrawingToolbarAction.DELETE_STRAT:
        this.askForDeleteStrat(this.currentStrat);
        break;
      case DrawingToolbarAction.ENABLE_DRAGGING_MODE:
        this.store.dispatch(
          StratStore.SetDrawingMode({ drawingMode: DrawingMode.Dragging })
        );
        break;
      case DrawingToolbarAction.ENABLE_DRAWING_MODE:
        this.store.dispatch(
          StratStore.SetDrawingMode({ drawingMode: DrawingMode.Drawing })
        );
        break;
      case DrawingToolbarAction.ENABLE_SELECT_MODE:
        this.store.dispatch(
          StratStore.SetDrawingMode({ drawingMode: DrawingMode.Selection })
        );
        break;
      case DrawingToolbarAction.OPEN_STRAT:
        this.router.navigateByUrl('my-strats');
        break;
      case DrawingToolbarAction.SAVE_STRAT:
        this.askForSaveStrat();
        break;
      case DrawingToolbarAction.SHOW_INFOS:
        this.showInfos();
        break;
      case DrawingToolbarAction.DOWNLOAD_STRAT:
        this.store.dispatch(
          StratStore.SetDrawerAction({
            action: {
              type: DrawerActionType.MISC,
              name: 'Download',
            } as DrawerAction,
          })
        );
      default:
        break;
    }
  }

  private showInfos() {
    const dialogRef = this.dialog.open(StratSavingDialogComponent, {
      width: '400px',
      hasBackdrop: true,
      data: {
        name: this.currentStrat.name,
        description: this.currentStrat.description,
        isPublic: this.currentStrat.isPublic,
      },
      panelClass: ['strat-saving-dialog'],
    });
    dialogRef.afterClosed().subscribe((stratInfos: StratInfosDialogData) => {
      if (stratInfos) {
        this.store.dispatch(StratStore.UpdateStratInfos(stratInfos));
      }
    });
  }

  public stopWheelEvent($event) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  public onMapLoadingError($event) {
    this.notificationService.displayNotification({
      message: 'Error when loading floor image',
      type: NotificationType.error,
    });
    this.store.dispatch(StratStore.ClearStratState());
    this.store.dispatch(StratStore.ClearMapState());
  }
}
