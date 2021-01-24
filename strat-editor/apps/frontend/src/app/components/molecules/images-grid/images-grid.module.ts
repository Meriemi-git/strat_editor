import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesGridComponent } from './images-grid.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { PipesModule } from '../../../pipes.module';

@NgModule({
  declarations: [ImagesGridComponent],
  imports: [CommonModule, MatGridListModule, PipesModule],
  exports: [ImagesGridComponent],
})
export class ImagesGridModule {}
