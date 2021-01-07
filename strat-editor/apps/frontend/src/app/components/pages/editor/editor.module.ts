import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AssetPanelModule } from '../../molecules/assets-panel/assets-panel.module';
import { IconHelperService } from '@strat-editor/drawing-editor';
import { MapGridModule } from '../../molecules/map-grid/map-grid.module';
import { DrawingEditorModule } from '@strat-editor/drawing-editor';
import { RightPanelModule } from '../../molecules/right-panel/right-panel.module';

@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    EditorRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    AssetPanelModule,
    RightPanelModule,
    MapGridModule,
    DrawingEditorModule,
  ],
  providers: [IconHelperService],
  exports: [EditorComponent],
})
export class EditorModule {}
