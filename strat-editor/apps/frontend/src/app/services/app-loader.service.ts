import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserInfos } from '@strat-editor/data';
import { StratEditorState } from '../store/reducers';
import * as Actions from '../store/actions';

@Injectable({
  providedIn: 'root',
})
export class AppLoaderService {
  constructor(private store: Store<StratEditorState>) {}

  public initializeApp(): Promise<any> {
    return new Promise((resolve, reject) => {
      const userInfos: UserInfos = JSON.parse(
        localStorage.getItem('userInfos')
      );
      if (userInfos) {
        this.store.dispatch(Actions.LogInSuccess({ userInfos }));
      }
      resolve(userInfos);
    });
  }
}
