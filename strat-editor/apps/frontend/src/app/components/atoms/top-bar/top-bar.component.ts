import { Component, Input } from '@angular/core';
import { Agent } from '@strat-editor/data';

@Component({
  selector: 'strat-editor-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  @Input() agent : Agent
}
