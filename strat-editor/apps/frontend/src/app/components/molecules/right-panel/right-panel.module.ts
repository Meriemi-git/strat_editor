import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightPanelComponent } from './right-panel.component';
import { DrawingPanelModule } from '../drawing-panel/drawing-panel.module';
import { GalleryPanelModule } from '../gallery-panel/gallery-panel.module';
import { ImageHelperService } from '@strat-editor/drawing-editor';

@NgModule({
  declarations: [RightPanelComponent],
  imports: [CommonModule, DrawingPanelModule, GalleryPanelModule],
  providers: [ImageHelperService],
  exports: [RightPanelComponent],
})
export class RightPanelModule {}
