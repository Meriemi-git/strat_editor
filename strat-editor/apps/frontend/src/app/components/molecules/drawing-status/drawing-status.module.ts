import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawingStatusComponent } from './drawing-status.component';
import { MatChipsModule } from '@angular/material/chips';
@NgModule({
  declarations: [DrawingStatusComponent],
  imports: [CommonModule, MatChipsModule],
  exports: [DrawingStatusComponent],
})
export class DrawingStatusModule {}
