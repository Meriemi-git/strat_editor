import * as authActions from '../actions/auth.action';
import * as userActions from '../actions/user.action';

import { createReducer, on, Action } from '@ngrx/store';
import { UserState } from '../states/user.state';

export const initialstate: UserState = {
  userInfos: null,
  error: null,
};

const authReducer = createReducer(
  initialstate,
  on(authActions.LogIn, (state) => ({
    ...state,
    error: null,
  })),
  on(authActions.LogInSuccess, (state, { userInfos }) => ({
    ...state,
    userInfos: userInfos,
  })),
  on(authActions.LogInError, (state, { error }) => ({
    ...state,
    userInfos: null,
    error: error,
  })),
  on(authActions.Disconnect, (state) => ({
    ...state,
  })),
  on(authActions.DisconnectSuccess, (state) => ({
    ...state,
    userInfos: null,
    error: null,
  })),
  on(authActions.DisconnectError, (state, { error }) => ({
    ...state,
    userInfos: null,
    error: error,
  })),
  on(authActions.RefreshTokens, (state) => ({
    ...state,
    userInfos: null,
  })),
  on(authActions.RefreshTokensSuccess, (state, { userInfos }) => ({
    ...state,
    userInfos: userInfos,
    error: null,
  })),
  on(authActions.RefreshTokensError, (state, { error }) => ({
    ...state,
    userInfos: null,
    error: error,
  })),
  on(authActions.ConfirmEmail, (state) => ({
    ...state,
    error: null,
  })),
  on(authActions.ConfirmEmailSuccess, (state) => ({
    ...state,
    error: null,
  })),
  on(authActions.ConfirmEmailError, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(userActions.SendConfirmationEmail, (state, { userInfos }) => ({
    ...state,
    error: null,
  })),
  on(userActions.SendConfirmationEmailSuccess, (state, { userInfos }) => ({
    ...state,
    userInfos: userInfos,
    error: null,
  })),
  on(userActions.SendConfirmationEmailError, (state, { error }) => ({
    ...state,
    error: error,
  })),
  /// User actions
  on(userActions.ChangeMail, (state) => ({
    ...state,
    error: null,
  })),
  on(userActions.ChangeMailSuccess, (state, { userInfos }) => ({
    ...state,
    userInfos: userInfos,
    error: null,
  })),
  on(userActions.ChangeMailError, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(userActions.ChangePassword, (state) => ({
    ...state,
    error: null,
  })),
  on(userActions.ChangePasswordSuccess, (state) => ({
    ...state,
    error: null,
  })),
  on(userActions.ChangePasswordError, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(userActions.Register, (state) => ({
    ...state,
    error: null,
  })),
  on(userActions.RegisterSuccess, (state, { userInfos }) => ({
    ...state,
    userInfos: userInfos,
    error: null,
  })),
  on(userActions.RegisterError, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(userActions.GetUserInfos, (state) => ({
    ...state,
    error: null,
  })),
  on(userActions.GetUserInfosSuccess, (state, { userInfos }) => ({
    ...state,
    userInfos: userInfos,
    error: null,
  })),
  on(userActions.GetUserInfosError, (state, { error }) => ({
    ...state,
    error: error,
  }))
);

export function reducer(state: UserState | undefined, action: Action) {
  return authReducer(state, action);
}
