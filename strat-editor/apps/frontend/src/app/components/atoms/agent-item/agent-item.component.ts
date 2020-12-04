import { Component, Input } from '@angular/core';
import { Agent } from '@strat-editor/data';

@Component({
  selector: 'strat-editor-agent',
  templateUrl: './agent-item.component.html',
  styleUrls: ['./agent-item.component.scss']
})
export class AgentBadgeComponent {
  @Input() agent : Agent;
}
