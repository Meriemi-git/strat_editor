import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawingPanelComponent } from './drawing-panel.component';
import { ShapeWidgetModule } from '../../atoms/shape-widget/shape-widget.module';

@NgModule({
  declarations: [DrawingPanelComponent],
  imports: [
    CommonModule,
    ShapeWidgetModule
  ],
  exports:[DrawingPanelComponent]
})
export class DrawingPanelModule { }
