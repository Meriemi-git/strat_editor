import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PasswordChangeWrapper, UserInfos } from '@strat-editor/data';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from '../../../services/user.service';
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
  constructor(
    private store: Store<StratEditorState>,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userInfos: UserInfos = JSON.parse(localStorage.getItem('userInfos'));
    if (userInfos) {
      this.$userInfos = this.userService.getUserInfos(userInfos.userId).pipe(
        map((userInfos) => {
          return userInfos;
        }),
        catchError((err) => {
          console.log('Error when getting user Infos', err);
          return throwError(err);
        })
      );
      this.$httpError = this.store.select(Selectors.getAuthError);
    }
  }

  onPasswordChanged(passwords: PasswordChangeWrapper) {
    this.store.dispatch(Actions.ChangePassword({ passwords }));
  }
}
