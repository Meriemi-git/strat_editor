import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { Agent } from '@strat-editor/data';

@Component({
  selector: 'strat-editor-agent',
  templateUrl: './agent-item.component.html',
  styleUrls: ['./agent-item.component.scss'],
})
export class AgentBadgeComponent {
  @Input() agent: Agent;
  @Output() agentDragged = new EventEmitter<Agent>();

  private isDown: boolean;

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: any) {
    this.isDown = true;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: any) {
    if (this.isDown) {
      this.agentDragged.emit(this.agent);
      this.isDown = false;
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: any) {
    this.isDown = false;
  }

  @HostListener('mouseout', ['$event'])
  onMouseOut(event: any) {
    this.isDown = false;
  }
}
