import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapEditorComponent } from './map-panel.component';
import { MapGridModule } from '../map-grid/map-grid.module';

@NgModule({
  declarations: [MapEditorComponent],
  imports: [
    CommonModule,
    MapGridModule
  ],
  exports:[MapEditorComponent]
})
export class MapEditorModule { }
