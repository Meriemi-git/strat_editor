import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploaderComponent } from './image-uploader.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ImageUploaderComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [ImageUploaderComponent],
})
export class ImageUploaderModule {}
