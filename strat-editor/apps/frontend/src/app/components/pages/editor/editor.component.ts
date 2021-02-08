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

    this.activatedRoute.params.subscribe((params) => {
      if (params.stratId) {
        this.loadStrat(params.stratId);
      }
    });

    this.store.select(StratStore.getSelectedMap).subscribe((map) => {
      this.selectedMap = map;
      if (map) {
        if (!this.currentStrat) {
          const newStrat = this.createNewStrat(map);
          const defaultLayer = newStrat.layers[0];
          this.store.dispatch(StratStore.CreateStrat({ strat: newStrat }));
          this.store
            .select(StratStore.getFloorById, defaultLayer.floorId)
            .subscribe((floor) => {
              if (floor) {
                this.store.dispatch(SelectFloor({ floor }));
                this.store.dispatch(
                  StratStore.SelectLayer({ layer: defaultLayer })
                );
              }
            });
        } else {
          // TODO implement better management
          this.openConfirmationDialog(map);
        }
      }
    });

    this.store.select(StratStore.getSelectedFloor).subscribe((floor) => {
      this.selectedFloor = floor;
      if (this.currentStrat) {
        const layer = this.currentStrat.layers.find(
          (layer) => layer.floorId === floor._id
        );
        this.store.dispatch(SelectLayer({ layer }));
      } else {
        // TODO what i must do ???
      }
    });

    this.store.select(StratStore.getStrat).subscribe((strat) => {
      this.currentStrat = strat;
      if (strat) {
        this.manageStrat(strat);
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
  manageStrat(strat: Strat) {
    this.store.select(StratStore.getStratAction).subscribe((action) => {
      switch (action) {
        case StratAction.LOAD:
        case StratAction.CREATE:
          const fullFilledLayer: Layer = strat.layers.find(
            (layer) => layer.canvasState
          );
          this.store
            .select(StratStore.getMapById, strat.mapId)
            .subscribe((map) => {
              if (map) {
                this.store.dispatch(StratStore.SelectMap({ map }));
                this.store.dispatch(
                  StratStore.SelectLayer({
                    layer: fullFilledLayer ?? strat.layers[0],
                  })
                );
              }
            });
          break;
        case StratAction.UPDATE:
          break;
        case StratAction.UPDATE_INFOS:
          break;
        case StratAction.UPDATE_LAYER:
          break;
        default:
          break;
      }
    });
  }

  /**
   * Load strat by id
   * @param stratId Strat id to be laoded
   */
  private loadStrat(stratId: string) {
    console.log('loadStrat');
    this.store.select(StratStore.getStratById, stratId).subscribe((strat) => {
      console.log('loadStrat strat', strat);
      if (strat) {
        console.log('LoadStratSuccess LoadStratSuccess', strat);
        this.store.dispatch(LoadStratSuccess({ strat }));
      } else {
        console.log('dispatch LoadStrat', strat);
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
          this.store.select(StratStore.getStrat).subscribe((strat) => {
            this.store.dispatch(StratStore.SaveStrat({ strat }));
          });
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
