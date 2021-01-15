import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserInfos } from '@strat-editor/data';
import { StratEditorState } from '../store/reducers';
import * as Actions from '../store/actions';
import { AuthentService } from './authent.service';

@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  constructor(
    private store: Store<StratEditorState>,
    private authentService: AuthentService
  ) {}

  public initializeApp(): void {
    const userInfos: UserInfos = JSON.parse(localStorage.getItem('userInfos'));
    if (userInfos) {
      this.store.dispatch(Actions.RefreshTokens());
    }
  }
}
