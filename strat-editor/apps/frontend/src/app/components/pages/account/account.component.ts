import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PasswordChangeWrapper, UserInfos } from '@strat-editor/data';
import { Observable } from 'rxjs';
import * as StratStore from '@strat-editor/store';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'strat-editor-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  $userInfos: Observable<UserInfos>;
  $httpError: Observable<HttpErrorResponse>;
  constructor(private store: Store<StratStore.StratEditorState>) {}

  ngOnInit(): void {
    this.$userInfos = this.store.select(StratStore.getUserInfos);
    this.$httpError = this.store.select(StratStore.getAuthError);
  }

  onPasswordChanged(passwords: PasswordChangeWrapper) {
    this.store.dispatch(StratStore.ChangePassword({ passwords }));
  }

  onMailChange(newMail: string) {
    this.store.dispatch(StratStore.ChangeMail({ newMail }));
  }

  resendEmailLink(userInfos: UserInfos) {
    this.store.dispatch(StratStore.SendConfirmationEmail({ userInfos }));
  }
}
