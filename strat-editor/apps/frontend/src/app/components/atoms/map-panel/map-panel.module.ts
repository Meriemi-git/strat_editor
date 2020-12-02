import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapPanelComponent } from './map-panel.component';

@NgModule({
  declarations: [MapPanelComponent],
  imports: [
    CommonModule
  ],
  exports : [MapPanelComponent]
})
export class MapPanelModule { }
