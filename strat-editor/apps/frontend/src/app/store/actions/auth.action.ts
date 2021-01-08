import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props, union } from '@ngrx/store';
import { AuthInfos, UserDto } from '@strat-editor/data';

export const LogIn = createAction(
  '[Auth] LogIn',
  props<{ userDto: UserDto }>()
);

export const LogInSuccess = createAction(
  '[Auth] LogIn Success',
  props<{ authInfos: AuthInfos }>()
);

export const LogInError = createAction(
  '[Auth] LogIn Error',
  props<{ error: HttpErrorResponse }>()
);

export const Register = createAction(
  '[Auth] Register',
  props<{ userDto: UserDto }>()
);

export const RegisterSuccess = createAction('[Auth] Register Success');

export const RegisterError = createAction(
  '[Auth] Register Error',
  props<{ error: any }>()
);

export const Disconnect = createAction('[Auth] Disconnect');

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
