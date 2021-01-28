import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AgentBadgeComponent } from './agent-item.component';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [AgentBadgeComponent],
  imports: [CommonModule, MatCardModule, MatRippleModule],
  exports: [AgentBadgeComponent],
})
export class AgentBadgeModule {}
