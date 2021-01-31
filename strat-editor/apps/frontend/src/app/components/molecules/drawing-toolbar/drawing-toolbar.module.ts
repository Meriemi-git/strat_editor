import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawingToolbarComponent } from './drawing-toolbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [DrawingToolbarComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatFormFieldModule,
  ],
  exports: [DrawingToolbarComponent],
})
export class DrawingToolbarModule {}
