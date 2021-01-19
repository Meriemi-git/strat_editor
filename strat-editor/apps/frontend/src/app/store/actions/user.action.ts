import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props, union } from '@ngrx/store';
import { PasswordChangeWrapper, UserDto, UserInfos } from '@strat-editor/data';

export const GetUserInfos = createAction(
  '[User] Get User infos',
  props<{ userId: string }>()
);

export const GetUserInfosSuccess = createAction(
  '[User] Get User infos Success',
  props<{ userInfos: UserInfos }>()
);

export const GetUserInfosError = createAction(
  '[User] Get User infos Error',
  props<{ error: HttpErrorResponse }>()
);

export const ChangePassword = createAction(
  '[User] Change Password',
  props<{ passwords: PasswordChangeWrapper }>()
);

export const ChangePasswordSuccess = createAction(
  '[User] Change Password success'
);

export const ChangePasswordError = createAction(
  '[User] Change Password error',
  props<{ error: HttpErrorResponse }>()
);

export const ChangeMail = createAction(
  '[User] Change Mail',
  props<{ newMail: string }>()
);

export const ChangeMailSuccess = createAction(
  '[User] Change Mail success',
  props<{ userInfos: UserInfos }>()
);

export const ChangeMailError = createAction(
  '[User] Change Mail error',
  props<{ error: HttpErrorResponse }>()
);

export const Register = createAction(
  '[User] Register',
  props<{ userDto: UserDto }>()
);

export const RegisterSuccess = createAction(
  '[User] Register Success',
  props<{ userInfos: UserInfos }>()
);

export const RegisterError = createAction(
  '[User] Register Error',
  props<{ error: HttpErrorResponse }>()
);
