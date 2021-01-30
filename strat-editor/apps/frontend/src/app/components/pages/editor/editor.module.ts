import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import { ImageHelperService } from '@strat-editor/drawing-editor';
import { MapGridModule } from '../../molecules/map-grid/map-grid.module';
import { DrawingEditorModule } from '@strat-editor/drawing-editor';
import { EditorRoutingModule } from './editor-routing.module';
import { DrawingStatusModule } from '../../molecules/drawing-status/drawing-status.module';
import { DrawingToolbarModule } from '../../molecules/drawing-toolbar/drawing-toolbar.module';
import { StratTitleModule } from '../../atoms/strat-title/strat-title.module';

@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    MapGridModule,
    EditorRoutingModule,
    DrawingEditorModule,
    DrawingStatusModule,
    DrawingEditorModule,
    DrawingToolbarModule,
    StratTitleModule,
  ],
  providers: [ImageHelperService],
  exports: [EditorComponent],
})
export class EditorModule {}
