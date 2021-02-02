import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserInfos } from '@strat-editor/data';
import * as StratStore from '@strat-editor/store';

@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  constructor(private store: Store<StratStore.StratEditorState>) {}

  public initializeApp(): void {
    const userInfos: UserInfos = JSON.parse(localStorage.getItem('userInfos'));
    if (userInfos) {
      this.store.dispatch(StratStore.RefreshTokens());
    }
  }
}
