import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentPanelComponent } from './agent-panel.component';

@NgModule({
  declarations: [AgentPanelComponent],
  imports: [
    CommonModule
  ],
  exports:[AgentPanelComponent]
})
export class AgentPanelModule { }
