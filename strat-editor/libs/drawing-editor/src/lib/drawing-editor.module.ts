import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawingEditorComponent } from './components/drawing-editor/drawing-editor.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DrawingEditorComponent],
  exports: [DrawingEditorComponent],
})
export class DrawingEditorModule {}
