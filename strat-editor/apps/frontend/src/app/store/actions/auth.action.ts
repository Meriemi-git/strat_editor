import { createAction, props, union } from '@ngrx/store';
import { AuthInfos } from '@strat-editor/data';

export const LogIn = createAction(
  '[Auth] LogIn',
  props<{ authInfos: AuthInfos }>()
);

export const Disconnect = createAction('[Auth] Disconnect');

const actions = union({
  LogIn,
  Disconnect,
});

export type AuthActions = typeof actions;
