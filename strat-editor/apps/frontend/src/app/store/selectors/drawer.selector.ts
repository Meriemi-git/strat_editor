import { createSelector, createFeatureSelector } from '@ngrx/store';
import { selectAll } from '../reducers/drawer.reducer';
import { DrawerState } from '../states/drawer.state';

const drawingActionFeature = createFeatureSelector<DrawerState>('DrawerState');
export const selectDrawerState = createSelector(
  drawingActionFeature,
  (state: DrawerState) => state
);
export const selectAllDrawerActions = createSelector(
  drawingActionFeature,
  selectAll
);
export const getSelectedAction = createSelector(
  selectDrawerState,
  (state: DrawerState) => state.drawerAction
);
export const getSelectedOption = createSelector(
  selectDrawerState,
  (state: DrawerState) => state.optionAction
);

export const getColor = createSelector(
  drawingActionFeature,
  (state: DrawerState) => state.color
);

export const getFontNames = createSelector(
  drawingActionFeature,
  (state: DrawerState) => state.fontNames
);

export const getFontFamily = createSelector(
  drawingActionFeature,
  (state: DrawerState) => state.fontFamily
);

export const getFontSize = createSelector(
  drawingActionFeature,
  (state: DrawerState) => state.fontSize
);

export const getDrawingMode = createSelector(
  drawingActionFeature,
  (state: DrawerState) => state.drawingMode
);
