import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AgentBadgeComponent } from './agent-badge.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AgentBadgeComponent],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports:[AgentBadgeComponent]
})
export class AgentBadgeModule { }
