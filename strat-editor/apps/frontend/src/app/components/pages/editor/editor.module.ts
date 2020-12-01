import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { SidenavLeftContentModule } from "../../molecules/sidenav-left-content/sidenav-left-content.module"
import { MapModule } from "../../molecules/map/map.module"


@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    EditorRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MapModule,
    SidenavLeftContentModule
  ],
  exports: [EditorComponent]
})
export class EditorModule {

}
