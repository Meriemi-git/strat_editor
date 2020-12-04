import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { SidenavLeftContentModule } from "../../molecules/assets-panel/assets-panel.module"
import { MapEditorModule } from "../../molecules/map-panel/map-panel.module"
import { DrawingPanelModule } from '../../molecules/drawing-panel/drawing-panel.module'

@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    EditorRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MapEditorModule,
    SidenavLeftContentModule,
    DrawingPanelModule
  ],
  exports: [EditorComponent]
})
export class EditorModule {

}
