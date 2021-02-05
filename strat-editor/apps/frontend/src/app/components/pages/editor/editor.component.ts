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
import { DrawingEditorComponent } from '@strat-editor/drawing-editor';
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
export class EditorComponent implements OnInit {
  public $maps: Observable<Map[]>;

  public currentMap: Map;
  public currentFloor: Floor;
  public currentStrat: Strat;
  public userInfos: UserInfos;

  public width: number = 0;
  public height: number = 0;

  public $drawingMode: Observable<DrawingMode>;
  public $loadedStrat: Observable<Strat>;

  constructor(
    private store: Store<StratStore.StratEditorState>,

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

    this.store.select(StratStore.getUserInfos).subscribe((userInfos) => {
      this.userInfos = userInfos;
    });

    this.store.select(StratStore.getCurrentStrat).subscribe((currentStrat) => {
      this.currentStrat = currentStrat;
      if (currentStrat) {
        this.store
          .select(StratStore.getMapById, currentStrat.mapId)
          .subscribe((map) => {
            this.store.dispatch(StratStore.SelectMap({ map }));
          });
      }
    });

    this.store
      .select(StratStore.getCurrentCanvasState)
      .subscribe((canvasState) => {
        //this.updateStratFromCanvasState(canvasState);
      });
  }

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
