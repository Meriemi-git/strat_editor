import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapPanelComponent } from './map-item.component';

@NgModule({
  declarations: [MapPanelComponent],
  imports: [
    CommonModule
  ],
  exports : [MapPanelComponent]
})
export class MapPanelModule { }
