import { AuthInfos } from '@strat-editor/data';
import * as actions from '../actions/auth.action';
import { createReducer, on, Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export interface AuthState {
  infos: AuthInfos;
  error: HttpErrorResponse;
}

export const initialstate: AuthState = {
  infos: null,
  error: null,
};

const authReducer = createReducer(
  initialstate,
  on(actions.LogIn, (state) => ({
    ...state,
    error: null,
  })),
  on(actions.LogInSuccess, (state, { authInfos }) => ({
    ...state,
    infos: authInfos,
  })),
  on(actions.LogInError, (state, { error }) => ({
    ...state,
    infos: null,
    error: error,
  })),
  on(actions.Register, (state) => ({
    ...state,
    error: null,
  })),
  on(actions.RegisterSuccess, (state) => ({
    ...state,
    error: null,
  })),
  on(actions.RegisterError, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(actions.Disconnect, (state) => ({
    ...state,
    infos: null,
    error: null,
  }))
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
