import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawingEditorComponent } from './component/drawing-editor.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DrawingEditorComponent],
  exports: [DrawingEditorComponent],
})
export class DrawingEditorModule {}
