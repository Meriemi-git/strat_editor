import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesGridComponent } from './images-grid.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { PipesModule } from '../../../pipes.module';
import { ImagesItemModule } from '../../atoms/images-item/images-item.module';

@NgModule({
  declarations: [ImagesGridComponent],
  imports: [CommonModule, MatGridListModule, PipesModule, ImagesItemModule],
  exports: [ImagesGridComponent],
})
export class ImagesGridModule {}
