import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SidenavState } from '../reducers/sidenav.reducer';

const sidenavFeature = createFeatureSelector<SidenavState>('SidenavState');
export const selectSidenavState = createSelector(sidenavFeature,(state: SidenavState) => state);
export const isLeftSidenavOpened = createSelector(selectSidenavState,(state: SidenavState) => state.leftIsOpen);
export const isRightSidenavOpened = createSelector(selectSidenavState,(state: SidenavState) => state.rightIsOpen);
