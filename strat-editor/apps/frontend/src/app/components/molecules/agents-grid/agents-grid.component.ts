import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Agent } from '@strat-editor/data';

@Component({
  selector: 'strat-editor-agents-grid',
  templateUrl: './agents-grid.component.html',
  styleUrls: ['./agents-grid.component.scss'],
})
export class AgentsGridComponent {
  @Input() agents: Agent[];
  @Output() agentDragged = new EventEmitter<Agent>();

  onAgentDragged(agent: Agent) {
    this.agentDragged.emit(agent);
  }
}
