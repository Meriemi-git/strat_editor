import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as StratStore from '@strat-editor/store';
import { HttpErrorResponse } from '@angular/common/http';
import { UserDto, UserInfos } from '@strat-editor/data';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'strat-editor-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  httpError: HttpErrorResponse;
  $userInfos: Observable<UserInfos>;
  public userInfos: UserInfos;
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
    this.store
      .select(StratStore.getAuthError)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((error) => {
        this.httpError = error;
      });

    this.$userInfos = this.store.select(StratStore.getUserInfos);
    this.$userInfos
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((userInfos) => {
        this.userInfos = userInfos;
        if (userInfos) {
          this.router.navigateByUrl('/login');
        }
      });
  }

  onRegister(userDto: UserDto) {
    this.store.dispatch(StratStore.Register({ userDto }));
  }
}
