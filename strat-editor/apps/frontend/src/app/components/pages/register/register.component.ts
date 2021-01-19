import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StratEditorState } from '../../../store/reducers';
import * as Actions from '../../../store/actions';
import * as Selectors from '../../../store/selectors';
import { HttpErrorResponse } from '@angular/common/http';
import { UserDto, UserInfos } from '@strat-editor/data';
import { MatDialog } from '@angular/material/dialog';
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
  constructor(private store: Store<StratEditorState>, private router: Router) {}

  ngOnInit(): void {
    this.store.select(Selectors.getAuthError).subscribe((error) => {
      this.httpError = error;
    });

    this.$userInfos = this.store.select(Selectors.getUserInfos);
    this.$userInfos.subscribe((userInfos) => {
      this.userInfos = userInfos;
      if (userInfos) {
        this.router.navigateByUrl('/login');
      }
    });
  }

  onRegister(userDto: UserDto) {
    this.store.dispatch(Actions.Register({ userDto }));
  }
}
