import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StratEditorState } from '../../../store/reducers';
import * as Actions from '../../../store/actions';
import * as Selectors from '../../../store/selectors';
import { HttpErrorResponse } from '@angular/common/http';
import { UserDto, UserInfos } from '@strat-editor/data';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'strat-editor-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  httpError: HttpErrorResponse;
  isAlreadyRegistered: boolean;
  userInfos: UserInfos;
  constructor(
    private store: Store<StratEditorState>,
    public matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.select(Selectors.getAuthError).subscribe((error) => {
      this.httpError = error;
    });
    this.store.select(Selectors.getUserInfos).subscribe((userInfos) => {
      this.isAlreadyRegistered = userInfos !== null;
      this.userInfos = userInfos;
      // if (userInfos) {
      //   const infoModalData: InfoModalData = {
      //     title: 'Confirmation mail sent',
      //     text:
      //       'Please confirm your email by clicking on the link we sent you by email',
      //   };
      //   this.matDialog.open(InfoModalComponent, {
      //     data: infoModalData,
      //   });
      // }
    });
  }

  onRegister(userDto: UserDto) {
    this.store.dispatch(Actions.Register({ userDto }));
  }

  resendEmailLink() {
    this.store.dispatch(
      Actions.SendConfirmationEmail({ userInfos: this.userInfos })
    );
  }
}
