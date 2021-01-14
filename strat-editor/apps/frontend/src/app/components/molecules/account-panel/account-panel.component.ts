import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserDto, UserInfos } from '@strat-editor/data';
import { StratEditorState } from '../../../store/reducers';
import * as Actions from '../../../store/actions';
import * as Selectors from '../../../store/selectors';

import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'strat-editor-account-panel',
  templateUrl: './account-panel.component.html',
  styleUrls: ['./account-panel.component.scss'],
})
export class AccountPanelComponent implements OnInit {
  $userInfos: Observable<UserInfos>;
  public httpError: HttpErrorResponse;

  public isRegisterForm: boolean = false;

  constructor(
    private store: Store<StratEditorState>,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.$userInfos = this.store.select(Selectors.getUserInfos);
    this.$userInfos.subscribe((userInfos) => {
      if (userInfos) {
        this.isRegisterForm = false;
        this.httpError = null;
      }
    });
    this.store.select(Selectors.getAuthError).subscribe((error) => {
      this.httpError = error;
    });
  }
  onLogin(userDto: UserDto) {
    this.store.dispatch(Actions.LogIn({ userDto }));
  }

  onDisconnect() {
    this.store.dispatch(Actions.Disconnect());
  }

  onDisplayRegisterForm() {
    this.httpError = null;
    this.store.dispatch(Actions.closeRight());
    this.router.navigateByUrl('/register');
  }

  resendEmailLink(userInfos: UserInfos) {
    this.store.dispatch(Actions.SendConfirmationEmail({ userInfos }));
  }
  testAuthent() {
    this.userService.testAuthent().subscribe((result) => console.log(result));
  }
}
