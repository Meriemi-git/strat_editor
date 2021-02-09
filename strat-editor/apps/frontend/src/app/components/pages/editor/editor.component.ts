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
import { ActivatedRoute } from '@angular/router';
import {
  LoadStrat,
  LoadStratSuccess,
  SelectFloor,
  SetCurrentLayer,
} from '@strat-editor/store';
import { skip, takeUntil } from 'rxjs/operators';

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
    private activatedRoute: ActivatedRoute,
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
        this.selectedMap = map;
        this.manageMap(map);
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
        if (stratAndAction.strat) {
          this.manageStratByAction(stratAndAction);
        }
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
    console.log('e manageFloor', floor?.name);
    this.selectedFloor = floor;
    if (this.currentStrat) {
      console.log('e There is a current strat', this.currentStrat.name);
      const layer = this.currentStrat.layers.find(
        (layer) => layer.floorId === floor._id
      );
      console.log('e manageFloor dispatch SetCurrentLayer');
      this.store.dispatch(
        SetCurrentLayer({ layer: layer ?? this.currentStrat.layers[0] })
      );
    } else {
      // TODO what i must do ???
    }
  }
  private manageMap(map: Map) {
    console.log('e manageMap map', map?.name);
    if (map) {
      if (!this.currentStrat) {
        console.log('e manageMap this.currentStrat', this.currentStrat?.name);
        const newStrat = this.createNewStrat(map);
        const defaultLayer = newStrat.layers[0];
        console.log('e manageMap dispatch CreateStrat');
        this.store.dispatch(StratStore.CreateStrat({ strat: newStrat }));

        this.store
          .select(StratStore.getFloorById, defaultLayer.floorId)
          .subscribe((floor) => {
            if (floor) {
              console.log('e manageMap dispatch SelectFloor');
              this.store.dispatch(SelectFloor({ floor }));
            }
          });
      } else if (this.selectedMap != map) {
        // TODO implement better management
        this.openConfirmationDialog(map);
      } else {
        console.log('e current strat exists');
        const defaultLayer = this.currentStrat.layers[0];
        this.store
          .select(StratStore.getFloorById, defaultLayer.floorId)
          .subscribe((floor) => {
            if (floor) {
              console.log('e manageMap dispatch SelectFloor');
              this.store.dispatch(SelectFloor({ floor }));
            }
          });
      }
    } else {
      // TODO manage map selected is null
    }
  }

  private manageStratByAction(stratAndAction: any) {
    console.log('e Manage Strat');

    switch (stratAndAction.action) {
      case StratAction.LOAD:
        console.log('e Manage Strat LOAD');
        this.store
          .select(StratStore.getMapById, stratAndAction.strat.mapId)
          .subscribe((map) => {
            if (map) {
              console.log('e Manage Strat Dispatch SelectMap');
              this.store.dispatch(StratStore.SelectMap({ map }));
            }
          });

        break;
      case StratAction.CREATE:
        console.log('e Manage Strat CREATE');
        console.log('e Manage Strat Dispatch SelectMap');
        this.store
          .select(StratStore.getMapById, stratAndAction.strat.mapId)
          .subscribe((map) => {
            if (map) {
              this.store.dispatch(StratStore.SelectMap({ map }));
            }
          });
        break;
      case StratAction.UPDATE:
        console.log('e Manage Strat UPDATE');
        break;
      case StratAction.SAVE:
        console.log('e Manage Strat SAVE');
        break;
      case StratAction.UPDATE_INFOS:
        console.log('e Manage Strat UPDATE_INFOS');
        this.store.dispatch(
          StratStore.SaveStrat({ strat: stratAndAction.strat })
        );
        break;
      case StratAction.UPDATE_LAYER:
        console.log('e Manage Strat UPDATE_LAYER');
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
    console.log('Loading Strat');
    this.store.select(StratStore.getStratById, stratId).subscribe((strat) => {
      console.log('getStratById (from store):', strat);
      if (strat) {
        console.log('dispatch LoadStratSuccess', strat);
        this.store.dispatch(LoadStratSuccess({ strat }));
      } else {
        console.log('dispatch LoadStrat (from backend)', stratId);
        this.store.dispatch(LoadStrat({ stratId }));
      }
    });
  }

  public onCanvasUpdated(canvas: string) {}

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
    console.log('On Map Selected');
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
    console.log('in editor on draw');
    this.store.dispatch(
      StratStore.SetDrawingMode({ drawingMode: DrawingMode.Drawing })
    );
  }

  public onSave() {
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
          this.store.dispatch(StratStore.UpdateStratInfos(stratInfos));
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
