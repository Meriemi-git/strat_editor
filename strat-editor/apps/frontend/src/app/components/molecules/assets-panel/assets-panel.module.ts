import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentsGridModule } from '../agents-grid/agents-grid.module';
import { MatTabsModule } from '@angular/material/tabs';
import { AssetPanelComponent } from './assets-panel.component';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../../shared.module';

@NgModule({
  declarations: [AssetPanelComponent],
  imports: [
    CommonModule,
    AgentsGridModule,
    MatIconModule,
    MatTabsModule,
    SharedModule,
  ],
  exports: [AssetPanelComponent],
})
export class AssetPanelModule {}
