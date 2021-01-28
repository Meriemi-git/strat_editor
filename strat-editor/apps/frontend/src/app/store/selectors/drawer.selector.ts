import { createSelector, createFeatureSelector } from '@ngrx/store';
import { selectAll } from '../reducers/drawer.reducer';
import { DrawingActionState } from '../states/drawer.state';

const drawingActionFeature = createFeatureSelector<DrawingActionState>(
  'DrawerState'
);
export const selectDrawerState = createSelector(
  drawingActionFeature,
  (state: DrawingActionState) => state
);
export const selectAllDrawerActions = createSelector(
  drawingActionFeature,
  selectAll
);
export const getSelectedAction = createSelector(
  selectDrawerState,
  (state: DrawingActionState) => state.drawerAction
);
export const getSelectedOption = createSelector(
  selectDrawerState,
  (state: DrawingActionState) => state.optionAction
);

export const getColor = createSelector(
  drawingActionFeature,
  (state: DrawingActionState) => state.color
);

export const getFontNames = createSelector(
  drawingActionFeature,
  (state: DrawingActionState) => state.fontNames
);

export const getFontFamily = createSelector(
  drawingActionFeature,
  (state: DrawingActionState) => state.fontFamily
);

export const getFontSize = createSelector(
  drawingActionFeature,
  (state: DrawingActionState) => state.fontSize
);
