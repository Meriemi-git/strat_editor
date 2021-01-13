import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props, union } from '@ngrx/store';
import { UserDto, UserInfos } from '@strat-editor/data';

export const LogIn = createAction(
  '[Auth] LogIn',
  props<{ userDto: UserDto }>()
);

export const LogInSuccess = createAction(
  '[Auth] LogIn Success',
  props<{ userInfos: UserInfos }>()
);
export const RefreshTokens = createAction('[Auth] RefreshTokens');

export const RefreshTokensSuccess = createAction(
  '[Auth] RefreshTokens Success',
  props<{ userInfos: UserInfos }>()
);

export const RefreshTokensError = createAction(
  '[Auth] RefreshTokens Error',
  props<{ error: HttpErrorResponse }>()
);

export const LogInError = createAction(
  '[Auth] LogIn Error',
  props<{ error: HttpErrorResponse }>()
);

export const Register = createAction(
  '[Auth] Register',
  props<{ userDto: UserDto }>()
);

export const RegisterSuccess = createAction(
  '[Auth] Register Success',
  props<{ userInfos: UserInfos }>()
);

export const RegisterError = createAction(
  '[Auth] Register Error',
  props<{ error: HttpErrorResponse }>()
);

export const Disconnect = createAction('[Auth] Disconnect');
export const DisconnectSuccess = createAction('[Auth] Disconnect Success');
export const DisconnectError = createAction(
  '[Auth] Disconnect Error',
  props<{ error: HttpErrorResponse }>()
);
const actions = union({
  LogIn,
  LogInSuccess,
  LogInError,
  Disconnect,
  Register,
  RegisterSuccess,
  RegisterError,
});

export type AuthActions = typeof actions;
