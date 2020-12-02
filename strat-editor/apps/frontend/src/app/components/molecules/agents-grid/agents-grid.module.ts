import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentsGridComponent } from './agents-grid.component';
import { AgentBadgeModule } from '../../atoms/agent-badge/agent-badge.module';

@NgModule({
  declarations: [AgentsGridComponent],
  imports: [
    CommonModule,
    AgentBadgeModule
  ],
  exports:[AgentsGridComponent]
})
export class AgentsGridModule { }
