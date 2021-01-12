import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserDto, UserInfos } from '@strat-editor/data';
import { StratEditorState } from '../../../store/reducers';
import * as Actions from '../../../store/actions';
import * as Selectors from '../../../store/selectors';

import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'strat-editor-account-panel',
  templateUrl: './account-panel.component.html',
  styleUrls: ['./account-panel.component.scss'],
})
export class AccountPanelComponent implements OnInit {
  $userInfos: Observable<UserInfos>;
  public httpErrorResponse: HttpErrorResponse;

  public isRegisterForm: boolean = false;

  constructor(
    private store: Store<StratEditorState>,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.$userInfos = this.store.select(Selectors.getAuthInfos);
    this.$userInfos.subscribe((userInfos) => {
      if (userInfos) {
        this.httpErrorResponse = null;
      }
    });
    this.store.select(Selectors.getAuthError).subscribe((error) => {
      console.log('error', error);
      this.httpErrorResponse = error;
    });
  }

  onRegister(userDto: UserDto) {
    this.store.dispatch(Actions.Register({ userDto }));
  }

  onLogin(userDto: UserDto) {
    this.store.dispatch(Actions.LogIn({ userDto }));
  }

  onDisconnect() {
    this.store.dispatch(Actions.Disconnect());
  }

  onDisplayRegisterForm(display: boolean) {
    this.isRegisterForm = display;
    this.httpErrorResponse = null;
  }

  testAuthent() {
    this.userService.testAuthent().subscribe((result) => console.log(result));
  }
}
