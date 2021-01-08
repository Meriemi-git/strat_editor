import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StratEditorState } from '../../../store/reducers';
import * as Selectors from '../../../store/selectors';
import * as Actions from '../../../store/actions';
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

  constructor(private store: Store<StratEditorState>) {}

  ngOnInit(): void {
    this.$agents = this.store.select(Selectors.selectAllAgents);
    this.$isAgentsPanelOpened = this.store.select(
      Selectors.isAgentsPanelOpened
    );
    this.$isGadgetsPanelOpened = this.store.select(
      Selectors.isGadgetsPanelOpened
    );
  }

  onAgentDragged(agent: Agent) {
    this.store.dispatch(Actions.DragAgent({ agent }));
  }
}
