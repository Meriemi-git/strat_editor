import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
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

export const Disconnect = createAction('[Auth] Disconnect');

export const DisconnectSuccess = createAction('[Auth] Disconnect Success');

export const DisconnectError = createAction(
  '[Auth] Disconnect Error',
  props<{ error: HttpErrorResponse }>()
);

export const ConfirmEmail = createAction(
  '[Auth] ConfirmEmail ',
  props<{ token: string }>()
);
export const ConfirmEmailSuccess = createAction('[Auth] ConfirmEmail Success');

export const ConfirmEmailError = createAction(
  '[Auth] ConfirmEmail Error',
  props<{ error: HttpErrorResponse }>()
);
