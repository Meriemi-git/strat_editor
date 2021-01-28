import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesItemComponent } from './images-item.component';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [ImagesItemComponent],
  imports: [CommonModule, MatRippleModule],
  exports: [ImagesItemComponent],
})
export class ImagesItemModule {}
