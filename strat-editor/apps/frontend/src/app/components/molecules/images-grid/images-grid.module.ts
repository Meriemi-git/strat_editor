import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesGridComponent } from './images-grid.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { SharedModule } from '../../../shared.module';

@NgModule({
  declarations: [ImagesGridComponent],
  imports: [CommonModule, MatGridListModule, SharedModule],
  exports: [ImagesGridComponent],
})
export class ImagesGridModule {}
