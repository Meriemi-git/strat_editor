import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import { IconHelperService } from '@strat-editor/drawing-editor';
import { MapGridModule } from '../../molecules/map-grid/map-grid.module';
import { DrawingEditorModule } from '@strat-editor/drawing-editor';
import { EditorRoutingModule } from './editor-routing.module';

@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    MapGridModule,
    EditorRoutingModule,
    DrawingEditorModule,
  ],
  providers: [IconHelperService],
  exports: [EditorComponent],
})
export class EditorModule {}
