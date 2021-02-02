import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as StratStore from '@strat-editor/store';
import { HttpErrorResponse } from '@angular/common/http';
import { UserDto, UserInfos } from '@strat-editor/data';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'strat-editor-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  httpError: HttpErrorResponse;
  $userInfos: Observable<UserInfos>;
  public userInfos: UserInfos;
  constructor(
    private store: Store<StratStore.StratEditorState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.select(StratStore.getAuthError).subscribe((error) => {
      this.httpError = error;
    });

    this.$userInfos = this.store.select(StratStore.getUserInfos);
    this.$userInfos.subscribe((userInfos) => {
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
