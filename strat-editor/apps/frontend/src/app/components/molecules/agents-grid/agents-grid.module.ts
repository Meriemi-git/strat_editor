import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentsGridComponent } from './agents-grid.component';
import { AgentModule } from '../../atoms/agent/agent.module';



@NgModule({
  declarations: [AgentsGridComponent],
  imports: [
    CommonModule,
    AgentModule
  ],
  exports:[AgentsGridComponent]
})
export class AgentsGridModule { }
