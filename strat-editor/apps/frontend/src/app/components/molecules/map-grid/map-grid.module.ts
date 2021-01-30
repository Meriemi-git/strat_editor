import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapGridComponent } from './map-grid.component';
import { MapItemModule } from '../../atoms/map-item/map-item.module';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [MapGridComponent],
  imports: [CommonModule, MapItemModule, MatPaginatorModule],
  exports: [MapGridComponent],
})
export class MapGridModule {}
