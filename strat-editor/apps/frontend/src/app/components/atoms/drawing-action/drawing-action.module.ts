import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawingActionComponent } from './drawing-action.component';
import { IconWidgetModule } from '../icon-widget/icon-widget.module';

@NgModule({
  declarations: [DrawingActionComponent],
  imports: [CommonModule, IconWidgetModule],
  exports: [DrawingActionComponent],
})
export class DrawingActionModule {}
