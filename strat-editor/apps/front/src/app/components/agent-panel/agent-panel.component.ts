import { Component, Input, OnInit } from '@angular/core';
import { Agent } from '@strat-editor/models';

@Component({
  selector: 'strat-editor-agent-panel',
  templateUrl: './agent-panel.component.html',
  styleUrls: ['./agent-panel.component.scss']
})
export class AgentPanelComponent implements OnInit {
  @Input() agent : Agent
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
