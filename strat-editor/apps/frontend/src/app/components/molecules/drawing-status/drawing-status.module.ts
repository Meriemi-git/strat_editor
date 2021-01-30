import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawingStatusComponent } from './drawing-status.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [DrawingStatusComponent],
  imports: [CommonModule, MatChipsModule, MatTooltipModule],
  exports: [DrawingStatusComponent],
})
export class DrawingStatusModule {}
