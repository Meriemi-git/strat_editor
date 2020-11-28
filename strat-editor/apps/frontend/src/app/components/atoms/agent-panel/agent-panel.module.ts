import { NgModule } from '@angular/core';
import { AgentPanelComponent } from './agent-panel.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AgentPanelComponent],
  imports: [
    CommonModule,
  ],
  exports:[AgentPanelComponent]
})
export class AgentPanelModule { }
