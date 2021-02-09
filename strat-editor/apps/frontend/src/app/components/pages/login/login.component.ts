import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserDto, UserInfos } from '@strat-editor/data';
import { Observable, Subject } from 'rxjs';
import * as StratStore from '@strat-editor/store';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'strat-editor-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public $userInfos: Observable<UserInfos>;
  public httpError: HttpErrorResponse;
  private unsubscriber = new Subject();

  constructor(
    private store: Store<StratStore.StratEditorState>,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  ngOnInit(): void {
    this.$userInfos = this.store.select(StratStore.getUserInfos);
    this.$userInfos
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((userInfos) => {
        if (userInfos) {
          this.httpError = null;
          this.router.navigateByUrl('/');
        }
      });
    this.store
      .select(StratStore.getAuthError)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((error) => {
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
