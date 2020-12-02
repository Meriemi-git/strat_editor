import { Component, Input } from '@angular/core';
import { Agent } from '@strat-editor/data';

@Component({
  selector: 'strat-editor-agent',
  templateUrl: './agent-badge.component.html',
  styleUrls: ['./agent-badge.component.scss']
})
export class AgentBadgeComponent {
  @Input() agent : Agent;
}
