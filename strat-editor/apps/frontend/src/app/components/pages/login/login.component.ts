import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserDto, UserInfos } from '@strat-editor/data';
import { Observable } from 'rxjs';
import * as StratStore from '@strat-editor/store';

@Component({
  selector: 'strat-editor-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public $userInfos: Observable<UserInfos>;
  public httpError: HttpErrorResponse;
  constructor(
    private store: Store<StratStore.StratEditorState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.$userInfos = this.store.select(StratStore.getUserInfos);
    this.$userInfos.subscribe((userInfos) => {
      if (userInfos) {
        this.httpError = null;
        this.router.navigateByUrl('/');
      }
    });
    this.store.select(StratStore.getAuthError).subscribe((error) => {
      this.httpError = error;
    });
  }

  onLogin(userDto: UserDto) {
    this.store.dispatch(StratStore.LogIn({ userDto }));
  }

  onDisplayRegisterForm() {
    this.httpError = null;
    this.store.dispatch(StratStore.closeRight());
    this.router.navigateByUrl('/register');
  }
}
