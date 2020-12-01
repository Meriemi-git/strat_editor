import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoubleSidenavComponent } from './double-sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { SidenavLeftContentModule } from "../sidenav-left-content/sidenav-left-content.module"

@NgModule({
  declarations: [
    DoubleSidenavComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    SidenavLeftContentModule,
  ],
  exports: [DoubleSidenavComponent]
})
export class DoubleSidenavModule {}
