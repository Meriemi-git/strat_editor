import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryPanelComponent } from './gallery-panel.component';
import { ImageUploaderModule } from '../../atoms/image-uploader/image-uploader.module';
import { ImagesGridModule } from '../images-grid/images-grid.module';

@NgModule({
  declarations: [GalleryPanelComponent],
  imports: [CommonModule, ImageUploaderModule, ImagesGridModule],
  exports: [GalleryPanelComponent],
})
export class GalleryPanelModule {}
