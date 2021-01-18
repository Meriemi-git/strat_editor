import { UserInfos as userReducer } from '@strat-editor/data';
import * as actions from '../actions/auth.action';
import { createReducer, on, Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export interface UserState {
  userInfos: userReducer;
  error: HttpErrorResponse;
}

export const initialstate: UserState = {
  userInfos: null,
  error: null,
};

const authReducer = createReducer(
  initialstate,
  on(actions.LogIn, (state) => ({
    ...state,
    error: null,
  })),
  on(actions.LogInSuccess, (state, { userInfos }) => ({
    ...state,
    userInfos: userInfos,
  })),
  on(actions.LogInError, (state, { error }) => ({
    ...state,
    userInfos: null,
    error: error,
  })),
  on(actions.Register, (state) => ({
    ...state,
    error: null,
  })),
  on(actions.RegisterSuccess, (state, { userInfos }) => ({
    ...state,
    userInfos: userInfos,
    error: null,
  })),
  on(actions.RegisterError, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(actions.Disconnect, (state) => ({
    ...state,
  })),
  on(actions.DisconnectSuccess, (state) => ({
    ...state,
    userInfos: null,
    error: null,
  })),
  on(actions.DisconnectError, (state, { error }) => ({
    ...state,
    userInfos: null,
    error: error,
  })),
  on(actions.RefreshTokens, (state) => ({
    ...state,
    userInfos: null,
  })),
  on(actions.RefreshTokensSuccess, (state, { userInfos }) => ({
    ...state,
    userInfos: userInfos,
    error: null,
  })),
  on(actions.RefreshTokensError, (state, { error }) => ({
    ...state,
    userInfos: null,
    error: error,
  })),
  on(actions.SendConfirmationEmail, (state, { userInfos }) => ({
    ...state,
    error: null,
  })),
  on(actions.SendConfirmationEmailSuccess, (state) => ({
    ...state,
    error: null,
  })),
  on(actions.SendConfirmationEmailError, (state, { error }) => ({
    ...state,
    error: error,
  }))
);

export function reducer(state: UserState | undefined, action: Action) {
  return authReducer(state, action);
}
