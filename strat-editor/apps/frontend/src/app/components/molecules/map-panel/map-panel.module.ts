import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapPanelComponent } from './map-panel.component';
import { MapGridModule } from '../map-grid/map-grid.module';
import { DrawingEditorModule } from '@strat-editor/drawing-editor';

@NgModule({
  declarations: [MapPanelComponent],
  imports: [
    CommonModule,
    MapGridModule,
    DrawingEditorModule
  ],
  exports:[MapPanelComponent]
})
export class MapEditorModule { }
