import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawingActionComponent } from './drawing-action.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [DrawingActionComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [DrawingActionComponent],
})
export class DrawingActionModule {}
