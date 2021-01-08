import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthInfos, UserDto } from '@strat-editor/data';
import { StratEditorState } from '../../../store/reducers';
import * as Actions from '../../../store/actions';
import * as Selectors from '../../../store/selectors';

import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'strat-editor-account-panel',
  templateUrl: './account-panel.component.html',
  styleUrls: ['./account-panel.component.scss'],
})
export class AccountPanelComponent implements OnInit {
  $authInfos: Observable<AuthInfos>;
  public httpErrorResponse: HttpErrorResponse;

  public isRegisterForm: boolean = false;

  constructor(private store: Store<StratEditorState>) {}

  ngOnInit(): void {
    this.$authInfos = this.store.select(Selectors.getAuthInfos);
    this.$authInfos.subscribe((authInfos) => {
      if (authInfos) {
        localStorage.setItem('accessToken', authInfos.accessToken);
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
}
