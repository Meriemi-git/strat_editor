import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SidenavState } from '../states/sidenav.state';

const sidenavFeature = createFeatureSelector<SidenavState>('SidenavState');

export const selectSidenavState = createSelector(
  sidenavFeature,
  (state: SidenavState) => state
);
export const isLeftSidenavOpened = createSelector(
  selectSidenavState,
  (state: SidenavState) => state.leftIsOpen
);
export const isRightSidenavOpened = createSelector(
  selectSidenavState,
  (state: SidenavState) => state.rightIsOpen
);
export const isAgentsPanelOpened = createSelector(
  selectSidenavState,
  (state: SidenavState) => state.agentsPanelIsOpen
);
export const isDrawingPanelOpened = createSelector(
  selectSidenavState,
  (state: SidenavState) => state.drawingPanelIsOpen
);
export const isGadgetsPanelOpened = createSelector(
  selectSidenavState,
  (state: SidenavState) => state.gadgetsPanelIsOpen
);
export const isGalleryPanelOpened = createSelector(
  selectSidenavState,
  (state: SidenavState) => state.galleryPanelIsOpen
);
