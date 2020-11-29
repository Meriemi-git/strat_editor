import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoubleSidenavComponent } from './double-sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button'
import { AgentsGridModule } from '../agents-grid/agents-grid.module';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [DoubleSidenavComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    AgentsGridModule,
    MatTabsModule
  ],
  exports: [DoubleSidenavComponent]
})
export class DoubleSidenavModule {}
