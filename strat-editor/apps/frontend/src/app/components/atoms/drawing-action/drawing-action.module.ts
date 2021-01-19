import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawingActionComponent } from './drawing-action.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SvgIconModule } from '../svg-icon/svg-icon.module';

@NgModule({
  declarations: [DrawingActionComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule, SvgIconModule],
  exports: [DrawingActionComponent],
})
export class DrawingActionModule {}
