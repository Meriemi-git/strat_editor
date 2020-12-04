import { Component, Input } from '@angular/core';
import { Agent } from '@strat-editor/data';

@Component({
  selector: 'strat-editor-assets-panel',
  templateUrl: './assets-panel.component.html',
  styleUrls: ['./assets-panel.component.scss']
})
export class SidenavLeftContentComponent {
  @Input() agents : Agent[]
  @Input() gadgets : Agent[]
}
