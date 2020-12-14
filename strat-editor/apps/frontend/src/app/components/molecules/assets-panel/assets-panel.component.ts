import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Agent } from '@strat-editor/data';
import { Observable } from 'rxjs';
import { StratEditorState } from '../../../store/reducers';
import * as Selectors from '../../../store/selectors';

@Component({
  selector: 'strat-editor-assets-panel',
  templateUrl: './assets-panel.component.html',
  styleUrls: ['./assets-panel.component.scss']
})
export class AssetPanelComponent implements OnInit {
  $agents: Observable<Agent[]>;

  constructor(private store: Store<StratEditorState>){

  }
  ngOnInit(): void {
    this.$agents = this.store.select(Selectors.selectAllAgents);
  }
}
