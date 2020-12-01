import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Agent } from '@strat-editor/data';
import { Observable } from 'rxjs';
import { StratEditorState } from '../../../store/reducers';
import * as SidenavSelectors from '../../../store/selectors/sidenav.selector';
import * as SidenavActions from '../../../store/actions/sidenav.action';
import * as AgentActions from '../../../store/actions/agent.action';
import * as AgentSelectors from '../../../store/selectors/agent.selector';

@Component({
  selector: 'strat-editor-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  leftIsOpened: boolean;
  left2IsOpened: boolean;
  right2IsOpened: boolean;
  rightIsOpened: boolean;
  $agents : Observable<Agent[]>

  constructor(private store : Store<StratEditorState>){}

  ngOnInit(): void {
    this.store.select(SidenavSelectors.isLeftSidenavOpened).subscribe(isOpened => {
      this.leftIsOpened = isOpened
    })
    this.store.select(SidenavSelectors.isRightSidenavOpened).subscribe(isOpened => {
      this.rightIsOpened = isOpened
    })
    this.$agents = this.store.select(AgentSelectors.selectAgents)
    this.store.dispatch(AgentActions.FetchAgents());
  }

  toggleLeftSidenav(){
    this.store.dispatch(SidenavActions.toggleLeft())
  }

  toggleRightSidenav(){
    this.store.dispatch(SidenavActions.toggleRight())
  }
}
