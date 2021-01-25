import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapSelectorComponent } from './map-selector.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [MapSelectorComponent],
  imports: [CommonModule, MatSelectModule, MatFormFieldModule],
  exports: [MapSelectorComponent],
})
export class MapSelectorModule {}
