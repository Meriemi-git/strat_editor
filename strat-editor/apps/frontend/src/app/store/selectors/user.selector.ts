import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';

const userFeature = createFeatureSelector<UserState>('UserState');
export const userState = createSelector(
  userFeature,
  (state: UserState) => state
);
export const getUserInfos = createSelector(
  userState,
  (state: UserState) => state.userInfos
);

export const getAuthError = createSelector(
  userState,
  (state: UserState) => state.error
);
