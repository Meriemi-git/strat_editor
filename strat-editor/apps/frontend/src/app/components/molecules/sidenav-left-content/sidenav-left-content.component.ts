import { Component, Input } from '@angular/core';
import { Agent } from '@strat-editor/data';

@Component({
  selector: 'strat-editor-sidenav-left-content',
  templateUrl: './sidenav-left-content.component.html',
  styleUrls: ['./sidenav-left-content.component.scss']
})
export class SidenavLeftContentComponent {
  @Input() agents : Agent[]
  @Input() gadgets : Agent[]
}
