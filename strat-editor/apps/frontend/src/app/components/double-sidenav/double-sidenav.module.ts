import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoubleSidenavComponent } from './double-sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button'
import { AppRoutingModule } from '../../app-routing.module';
import { AgentsGridModule } from '../../components/agents-grid/agents-grid.module';


@NgModule({
  declarations: [DoubleSidenavComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    AppRoutingModule,
    AgentsGridModule],
  exports: [DoubleSidenavComponent]
})
export class DoubleSidenavModule {}
