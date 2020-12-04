import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentsGridModule } from '../agents-grid/agents-grid.module';
import { MatTabsModule } from '@angular/material/tabs';
import { SidenavLeftContentComponent } from './assets-panel.component';
import { MatIconModule } from '@angular/material/icon'
import { FilterPipe } from '../../../helpers/filter-pipe';
import { SortPipe } from '../../../helpers/sort-pipe';


@NgModule({
  declarations: [
    SidenavLeftContentComponent,
    FilterPipe,
    SortPipe
  ],
  imports: [
    CommonModule,
    AgentsGridModule,
    MatIconModule,
    MatTabsModule
  ],
  exports:
  [
    SidenavLeftContentComponent
  ]
})
export class SidenavLeftContentModule { }
