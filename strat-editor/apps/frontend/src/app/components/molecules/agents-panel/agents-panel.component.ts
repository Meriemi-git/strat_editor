import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Agent } from '@strat-editor/data';

@Component({
  selector: 'strat-editor-agents-panel',
  templateUrl: './agents-panel.component.html',
  styleUrls: ['./agents-panel.component.scss'],
})
export class AgentsPanelComponent {
  @Input() agents: Agent[];
  @Output() agentDragged = new EventEmitter<Agent>();

  constructor() {}

  onAgentDragged(agent: Agent) {
    this.agentDragged.emit(agent);
  }
}
