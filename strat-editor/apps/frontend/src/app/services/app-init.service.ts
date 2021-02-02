import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserInfos } from '@strat-editor/data';
import { StratEditorState } from '@strat-editor/store';
import * as Actions from '@strat-editor/store';

@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  constructor(private store: Store<StratEditorState>) {}

  public initializeApp(): void {
    const userInfos: UserInfos = JSON.parse(localStorage.getItem('userInfos'));
    if (userInfos) {
      this.store.dispatch(Actions.RefreshTokens());
    }
  }
}
