import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserInfos } from '@strat-editor/data';
import { AuthState } from '../reducers/auth.reducer';

const authFeature = createFeatureSelector<AuthState>('AuthState');
export const authState = createSelector(
  authFeature,
  (state: AuthState) => state
);
export const getAuthInfos = createSelector(
  authState,
  (state: AuthState) => state.userInfos
);

export const getAuthError = createSelector(
  authState,
  (state: AuthState) => state.error
);
