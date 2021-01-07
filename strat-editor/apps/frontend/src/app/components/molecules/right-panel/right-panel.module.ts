import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightPanelComponent } from './right-panel.component';
import { DrawingPanelModule } from '../drawing-panel/drawing-panel.module';
import { AccountPanelModule } from '../account-panel/account-panel.module';
import { GalleryPanelModule } from '../gallery-panel/gallery-panel.module';

@NgModule({
  declarations: [RightPanelComponent],
  imports: [
    CommonModule,
    DrawingPanelModule,
    AccountPanelModule,
    GalleryPanelModule,
  ],
  exports: [RightPanelComponent],
})
export class RightPanelModule {}
