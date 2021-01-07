import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StratEditorState } from './store/reducers';
import * as Actions from './store/actions';
import * as Selectors from './store/selectors';
@Component({
  selector: 'strat-editor-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  username: string;
  constructor(private store: Store<StratEditorState>) {}

  ngOnInit(): void {
    this.store
      .select(Selectors.getAuthInfos)
      .subscribe((authInfos) => (this.username = authInfos?.username));
  }

  onAccountButtonClicked() {
    this.store.dispatch(Actions.showAccountPanel());
  }
}
