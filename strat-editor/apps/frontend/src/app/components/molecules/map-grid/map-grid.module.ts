import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapGridComponent } from './map-grid.component';
import { MapPanelModule } from '../../atoms/map-panel/map-panel.module';



@NgModule({
  declarations: [MapGridComponent],
  imports: [
    CommonModule,
    MapPanelModule
  ],
  exports : [MapGridComponent]
})
export class MapGridModule { }
