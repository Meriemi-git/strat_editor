import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapPanelComponent } from './map-panel.component';
import { MapGridModule } from '../map-grid/map-grid.module';

@NgModule({
  declarations: [MapPanelComponent],
  imports: [
    CommonModule,
    MapGridModule
  ],
  exports:[MapPanelComponent]
})
export class MapEditorModule { }
