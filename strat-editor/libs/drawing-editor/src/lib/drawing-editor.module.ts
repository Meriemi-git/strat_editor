import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawingEditorComponent } from './components/drawing-editor/drawing-editor.component';
import { DrawingErrorHandler } from './drawing-error-handler';

@NgModule({
  imports: [CommonModule],
  declarations: [DrawingEditorComponent],
  exports: [DrawingEditorComponent],
  providers: [
    {
      provide: ErrorHandler,
      useClass: DrawingErrorHandler,
    },
  ],
})
export class DrawingEditorModule {}
