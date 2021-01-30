import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import { ImageHelperService } from '@strat-editor/drawing-editor';
import { MapGridModule } from '../../molecules/map-grid/map-grid.module';
import { DrawingEditorModule } from '@strat-editor/drawing-editor';
import { EditorRoutingModule } from './editor-routing.module';
import { DrawingStatusModule } from '../../molecules/drawing-status/drawing-status.module';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    MapGridModule,
    EditorRoutingModule,
    DrawingEditorModule,
    DrawingStatusModule,
    MatButtonModule,
  ],
  providers: [ImageHelperService],
  exports: [EditorComponent],
})
export class EditorModule {}
