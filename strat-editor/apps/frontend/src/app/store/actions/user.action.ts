import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props, union } from '@ngrx/store';
import { PasswordChangeWrapper, UserInfos } from '@strat-editor/data';

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
  '[Auth] Change Password',
  props<{ passwords: PasswordChangeWrapper }>()
);

export const ChangePasswordSuccess = createAction(
  '[Auth] Change Password success'
);

export const ChangePasswordError = createAction(
  '[Auth] Change Password error',
  props<{ error: HttpErrorResponse }>()
);
