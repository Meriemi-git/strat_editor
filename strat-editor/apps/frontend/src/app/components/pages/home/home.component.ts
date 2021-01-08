import { Component, OnInit } from '@angular/core';
import { StratEditorState } from '../../../store/reducers';
import { Store } from '@ngrx/store';
import * as AgentActions from '../../../store/actions/agent.action';

@Component({
  selector: 'strat-editor-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
