import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentsGridComponent } from './agents-grid.component';
import { AgentPanelModule } from '../agent-panel/agent-panel.module';



@NgModule({
  declarations: [AgentsGridComponent],
  imports: [
    CommonModule,AgentPanelModule
  ],
  exports:[AgentsGridComponent]
})
export class AgentsGridModule { }
