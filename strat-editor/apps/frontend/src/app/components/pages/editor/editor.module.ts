import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SidenavLeftContentModule } from '../../molecules/assets-panel/assets-panel.module';
import { DrawingPanelModule } from '../../molecules/drawing-panel/drawing-panel.module';
import { IconHelperService } from '@strat-editor/drawing-editor';
import { MapGridModule } from '../../molecules/map-grid/map-grid.module';
import { DrawingEditorModule } from '@strat-editor/drawing-editor';

@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    EditorRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    SidenavLeftContentModule,
    DrawingPanelModule,
    MapGridModule,
    DrawingEditorModule,
  ],
  providers: [IconHelperService],
  exports: [EditorComponent],
})
export class EditorModule {}
