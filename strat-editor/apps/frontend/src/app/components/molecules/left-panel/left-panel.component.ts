import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as StratStore from '@strat-editor/store';
import { Agent } from '@strat-editor/data';

@Component({
  selector: 'strat-editor-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss'],
})
export class LeftPanelComponent implements OnInit {
  $isAgentsPanelOpened: Observable<boolean>;
  $isGadgetsPanelOpened: Observable<boolean>;
  $agents: Observable<Agent[]>;

  constructor(private store: Store<StratStore.StratEditorState>) {}

  ngOnInit(): void {
    this.$agents = this.store.select(StratStore.selectAllAgents);
    this.$isAgentsPanelOpened = this.store.select(
      StratStore.isAgentsPanelOpened
    );
    this.$isGadgetsPanelOpened = this.store.select(
      StratStore.isGadgetsPanelOpened
    );
  }

  onAgentDragged(agent: Agent) {
    this.store.dispatch(StratStore.DragAgent({ agent }));
  }
}
