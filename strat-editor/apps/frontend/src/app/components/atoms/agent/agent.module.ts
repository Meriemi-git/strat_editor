import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AgentComponent } from './agent.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AgentComponent],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports:[AgentComponent]
})
export class AgentModule { }
