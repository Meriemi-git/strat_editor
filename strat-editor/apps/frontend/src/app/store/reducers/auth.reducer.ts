import { AuthInfos } from '@strat-editor/data';
import * as actions from '../actions/auth.action';
import { createReducer, on, Action } from '@ngrx/store';

export interface AuthState {
  infos: AuthInfos;
}

export const initialstate: AuthState = {
  infos: null,
};

const authReducer = createReducer(
  initialstate,
  on(actions.LogIn, (state, { authInfos }) => ({
    ...state,
    infos: authInfos,
  })),
  on(actions.Disconnect, (state) => ({
    ...state,
    infos: null,
  }))
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
