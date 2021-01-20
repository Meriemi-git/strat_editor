import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PasswordChangeWrapper, UserInfos } from '@strat-editor/data';
import { Observable } from 'rxjs';
import { StratEditorState } from '../../../store/reducers';
import * as Actions from '../../../store/actions';
import * as Selectors from '../../../store/selectors';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'strat-editor-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  $userInfos: Observable<UserInfos>;
  $httpError: Observable<HttpErrorResponse>;
  constructor(private store: Store<StratEditorState>) {}

  ngOnInit(): void {
    this.$userInfos = this.store.select(Selectors.getUserInfos);
    this.$httpError = this.store.select(Selectors.getAuthError);
    // const userInfos: UserInfos = JSON.parse(localStorage.getItem('userInfos'));
    // if (userInfos) {
    //   this.store.dispatch(Actions.GetUserInfos({ userId: userInfos.userId }));
    // }
  }

  onPasswordChanged(passwords: PasswordChangeWrapper) {
    this.store.dispatch(Actions.ChangePassword({ passwords }));
  }

  onMailChange(newMail: string) {
    this.store.dispatch(Actions.ChangeMail({ newMail }));
  }

  resendEmailLink(userInfos: UserInfos) {
    this.store.dispatch(Actions.SendConfirmationEmail({ userInfos }));
  }
}
