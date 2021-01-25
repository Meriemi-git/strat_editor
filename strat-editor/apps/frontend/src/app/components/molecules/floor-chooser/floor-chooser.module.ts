import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloorChooserComponent } from './floor-chooser.component';
import { FloorSelectorModule } from '../../atoms/floor-selector/floor-selector.module';
import { MapSelectorModule } from '../../atoms/map-selector/map-selector.module';

@NgModule({
  declarations: [FloorChooserComponent],
  imports: [CommonModule, FloorSelectorModule, MapSelectorModule],
  exports: [FloorChooserComponent],
})
export class FloorChooserModule {}
