import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftPanelComponent } from './left-panel.component';
import { AgentsPanelModule } from '../agents-panel/agents-panel.module';
import { GadgetPanelModule } from '../gadget-panel/gadget-panel.module';

@NgModule({
  declarations: [LeftPanelComponent],
  imports: [CommonModule, AgentsPanelModule, GadgetPanelModule],
  exports: [LeftPanelComponent],
})
export class LeftPanelModule {}
