import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawingEditorComponent } from './components/drawing-editor/drawing-editor.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatTooltipModule,
  ],
  declarations: [DrawingEditorComponent],
  exports: [DrawingEditorComponent],
})
export class DrawingEditorModule {}
