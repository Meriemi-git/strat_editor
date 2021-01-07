import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryPanelComponent } from './gallery-panel.component';
import { ImageUploaderModule } from '../../atoms/image-uploader/image-uploader.module';

@NgModule({
  declarations: [GalleryPanelComponent],
  imports: [CommonModule, ImageUploaderModule],
  exports: [GalleryPanelComponent],
})
export class GalleryPanelModule {}
