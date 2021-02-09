import { Component, OnInit } from '@angular/core';
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
import { Observable } from 'rxjs';
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
  SelectLayer,
} from '@strat-editor/store';

@Component({
  selector: 'strat-editor-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  public $maps: Observable<Map[]>;
  public $drawingMode: Observable<DrawingMode>;

  public selectedMap: Map;
  public selectedFloor: Floor;
  public currentStrat: Strat;
  public userInfos: UserInfos;

  public width: number = 0;
  public height: number = 0;

  constructor(
    private store: Store<StratStore.StratEditorState>,
    private activatedRoute: ActivatedRoute,
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
    this.store.select(StratStore.getUserInfos).subscribe((userInfos) => {
      this.userInfos = userInfos;
    });

    this.activatedRoute.params.subscribe((params) => {
      if (params.stratId) {
        this.loadStrat(params.stratId);
      }
    });

    this.store.select(StratStore.getSelectedMap).subscribe((map) => {
      this.selectedMap = map;
      console.log('e getSelectedMap map', map?.name);
      if (map) {
        if (!this.currentStrat) {
          console.log(
            'e getSelectedMap this.currentStrat',
            this.currentStrat?.name
          );

          const newStrat = this.createNewStrat(map);
          const defaultLayer = newStrat.layers[0];
          console.log('e getSelectedMap dispatch CreateStrat');
          this.store.dispatch(StratStore.CreateStrat({ strat: newStrat }));

          this.store
            .select(StratStore.getFloorById, defaultLayer.floorId)
            .subscribe((floor) => {
              if (floor) {
                console.log('e getSelectedMap dispatch SelectFloor');
                this.store.dispatch(SelectFloor({ floor }));
              }
            });
        } else if (this.selectedMap != map) {
          // TODO implement better management
          this.openConfirmationDialog(map);
        } else {
          const defaultLayer = this.currentStrat.layers[0];
          this.store
            .select(StratStore.getFloorById, defaultLayer.floorId)
            .subscribe((floor) => {
              if (floor) {
                console.log('e getSelectedMap dispatch SelectFloor');
                this.store.dispatch(SelectFloor({ floor }));
              }
            });
        }
      }
    });

    this.store.select(StratStore.getSelectedFloor).subscribe((floor) => {
      console.log('e getSelectedFloor', floor?.name);
      this.selectedFloor = floor;
      if (this.currentStrat) {
        const layer = this.currentStrat.layers.find(
          (layer) => layer.floorId === floor._id
        );
        console.log('e getSelectedFloor layer from floorId :', layer);
        console.log('e getSelectedFloor dispatch SelectLayer');
        this.store.dispatch(
          SelectLayer({ layer: layer ?? this.currentStrat.layers[0] })
        );
      } else {
        // TODO what i must do ???
      }
    });

    this.store
      .select(StratStore.getStratAndAction)
      .subscribe((stratAndAction) => {
        this.currentStrat = stratAndAction.strat;
        if (stratAndAction.strat) {
          this.manageStratByAction(stratAndAction);
        }
      });

    this.store.select(StratStore.getCanvas).subscribe((canvas) => {
      if (canvas) {
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

  manageStratByAction(stratAndAction: any) {
    console.log('Manage Strat');

    switch (stratAndAction.action) {
      case StratAction.LOAD:
        console.log('Manage Strat LOAD');
        this.store
          .select(StratStore.getMapById, stratAndAction.strat.mapId)
          .subscribe((map) => {
            if (map) {
              this.store.dispatch(StratStore.SelectMap({ map }));
            }
          });

        break;
      case StratAction.CREATE:
        console.log('Manage Strat CREATE');
        const fullFilledLayer: Layer = stratAndAction.strat.layers.find(
          (layer) => layer.canvasState
        );
        console.log('Manage Strat Dispatch SelectMap');
        this.store
          .select(StratStore.getMapById, stratAndAction.strat.mapId)
          .subscribe((map) => {
            if (map) {
              this.store.dispatch(StratStore.SelectMap({ map }));
            }
          });
        break;
      case StratAction.UPDATE:
        console.log('Manage Strat UPDATE');
        break;
      case StratAction.SAVE:
        console.log('Manage Strat SAVE');
        break;
      case StratAction.UPDATE_INFOS:
        console.log('Manage Strat UPDATE_INFOS');
        this.store.dispatch(
          StratStore.SaveStrat({ strat: stratAndAction.strat })
        );
        break;
      case StratAction.UPDATE_LAYER:
        console.log('Manage Strat UPDATE_LAYER');
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
        console.log('dispatch  (from backend)', stratId);
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
    this.store.dispatch(StratStore.SelectMap({ map: map }));
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
