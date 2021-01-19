import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightPanelComponent } from './right-panel.component';
import { DrawingPanelModule } from '../drawing-panel/drawing-panel.module';
import { GalleryPanelModule } from '../gallery-panel/gallery-panel.module';
import { IconHelperService } from '@strat-editor/drawing-editor';

@NgModule({
  declarations: [RightPanelComponent],
  imports: [CommonModule, DrawingPanelModule, GalleryPanelModule],
  providers: [IconHelperService],
  exports: [RightPanelComponent],
})
export class RightPanelModule {}
