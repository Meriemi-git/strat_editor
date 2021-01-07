import { AuthInfos } from '@strat-editor/data';
import * as actions from '../actions/auth.action';
import { createReducer, on, Action } from '@ngrx/store';

export interface AuthState {
  infos: AuthInfos;
  error: string;
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
  on(actions.Disconnect, (state) => ({
    ...state,
    infos: null,
    error: null,
  }))
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
