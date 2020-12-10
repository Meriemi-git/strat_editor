import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawingEditorComponent } from './components/drawing-editor/drawing-editor.component';
import { IconHelperService } from './services/icon-helper.service';

@NgModule({
  imports: [CommonModule],
  declarations: [DrawingEditorComponent],
  exports: [DrawingEditorComponent],
})
export class DrawingEditorModule {}
