import { Component, Input } from '@angular/core';
import { TestImport } from '@strat-editor/types';

@Component({
  selector: 'strat-editor-agents-grid',
  templateUrl: './agents-grid.component.html',
  styleUrls: ['./agents-grid.component.scss']
})
export class AgentsGridComponent {
  @Input() test : TestImport;

}
