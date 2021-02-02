import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserDto, UserInfos } from '@strat-editor/data';
import { Observable } from 'rxjs';
import * as Actions from '@strat-editor/store';
import { StratEditorState } from '@strat-editor/store';
import * as Selectors from '@strat-editor/store';

@Component({
  selector: 'strat-editor-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public $userInfos: Observable<UserInfos>;
  public httpError: HttpErrorResponse;
  constructor(private store: Store<StratEditorState>, private router: Router) {}

  ngOnInit(): void {
    this.$userInfos = this.store.select(Selectors.getUserInfos);
    this.$userInfos.subscribe((userInfos) => {
      if (userInfos) {
        this.httpError = null;
        this.router.navigateByUrl('/');
      }
    });
    this.store.select(Selectors.getAuthError).subscribe((error) => {
      this.httpError = error;
    });
  }

  onLogin(userDto: UserDto) {
    this.store.dispatch(Actions.LogIn({ userDto }));
  }

  onDisplayRegisterForm() {
    this.httpError = null;
    this.store.dispatch(Actions.closeRight());
    this.router.navigateByUrl('/register');
  }
}
