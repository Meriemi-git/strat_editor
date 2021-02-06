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
import { LoadStrat, LoadStratSuccess } from '@strat-editor/store';

@Component({
  selector: 'strat-editor-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  public $maps: Observable<Map[]>;

  public currentMap: Map;
  public currentFloor: Floor;
  public currentStrat: Strat;
  public userInfos: UserInfos;

  public width: number = 0;
  public height: number = 0;

  public $drawingMode: Observable<DrawingMode>;

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
      } else {
        this.loadNewMap();
      }
    });
    this.manageStore();
  }

  private manageStore() {
    this.store.select(StratStore.getSelectedAction).subscribe((selected) => {
      if (this.currentFloor) {
        this.store.dispatch(StratStore.closeRight());
      }
    });
    this.store.select(StratStore.getUserInfos).subscribe((userInfos) => {
      this.userInfos = userInfos;
    });

    this.store.select(StratStore.getSelectedFloor).subscribe((floor) => {
      console.log('e getSelectedFloor', floor?.name);
      this.currentFloor = floor;
    });

    this.store.select(StratStore.getCurrentStrat).subscribe((currentStrat) => {
      console.log('e getCurrentStrat', currentStrat?.name);
      this.currentStrat = currentStrat;
      // Strat exists
      if (currentStrat) {
        // Strat contains layers
        console.log('e getCurrentStrat currentMap', this.currentMap);
        if (
          currentStrat.layers.length > 0 &&
          this.currentMap?._id != currentStrat.mapId
        ) {
          // Load the map linked to this strat
          this.store
            .select(StratStore.getMapById, currentStrat.mapId)
            .subscribe((map) => {
              console.log('e Dispatch SelectMap');
              this.store.dispatch(StratStore.SelectMap({ map }));
            });
        }
      }
    });

    this.store.select(StratStore.getSelectedMap).subscribe((selectedMap) => {
      console.log('e getSelectedMap', selectedMap?.name);
      // There is a map
      if (selectedMap) {
        if (this.currentStrat) {
          console.log('e There is a strat', this.currentStrat?.name);
          if (this.currentStrat.layers.length > 0) {
            console.log('e This strat contains a layer');
            if (selectedMap._id != this.currentStrat.mapId) {
              console.log('e SelectedMap and layer map doesnt match');
              this.openConfirmationDialog(selectedMap);
            } else {
              console.log('e SelectedMap and layer map match');
              console.log('e Dispatch SelectFloor');
              this.store.dispatch(
                StratStore.SelectFloor({
                  floor: selectedMap
                    ? selectedMap.floors.find(
                        (floor) =>
                          floor._id === this.currentStrat.layers[0]?.floorId
                      )
                    : null,
                })
              );
            }
            // Ther is no layers in the current srat load first floor
          } else {
            console.log('e This strat doesnt contains a layer');
            console.log('e Dispatch SelectFloor');
            this.store.dispatch(
              StratStore.SelectFloor({
                floor: selectedMap.floors[0],
              })
            );
          }
        }
      }
      this.currentMap = selectedMap;
    });

    this.store
      .select(StratStore.getCurrentCanvas)
      .subscribe((currentCanvas) => {
        if (currentCanvas) {
          console.log('e getCurrentCanvas', currentCanvas.length);
          console.log('e Dispatch UpdateStratLayer');
          this.store.dispatch(
            StratStore.UpdateStratLayer({
              canvas: currentCanvas,
              floorId: this.currentFloor._id,
              floorName: this.currentFloor.name,
            })
          );
        }
      });
  }

  private loadStrat(stratId: string) {
    this.store.select(StratStore.getStratById, stratId).subscribe((strat) => {
      if (strat) {
        this.store.dispatch(LoadStratSuccess(strat));
      } else {
        this.store.dispatch(LoadStrat({ stratId }));
      }
    });
  }

  private loadNewMap() {
    const mapObserver = this.store
      .select(StratStore.getSelectedMap)
      .subscribe((selectedMap) => {
        this.currentMap = selectedMap;
        if (selectedMap) {
          this.currentStrat = this.createNewStrat(selectedMap);
          this.store.dispatch(
            StratStore.CreateStrat({ strat: this.currentStrat })
          );
          mapObserver.unsubscribe();
        }
      });
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
      description: 'Describe your strat here...',
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
          this.store.select(StratStore.getCurrentStrat).subscribe((strat) => {
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
