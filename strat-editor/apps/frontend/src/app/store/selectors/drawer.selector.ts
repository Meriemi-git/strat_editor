import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as Drawer from '../reducers/drawer.reducer';

const drawingActionFeature = createFeatureSelector<Drawer.DrawingActionState>(
  'DrawerState'
);
export const selectDrawerState = createSelector(
  drawingActionFeature,
  (state: Drawer.DrawingActionState) => state
);
export const selectAllDrawerActions = createSelector(
  drawingActionFeature,
  Drawer.selectAll
);
export const getSelectedAction = createSelector(
  selectDrawerState,
  (state: Drawer.DrawingActionState) => state.drawerAction
);
export const getSelectedOption = createSelector(
  selectDrawerState,
  (state: Drawer.DrawingActionState) => state.optionAction
);

export const getColor = createSelector(
  drawingActionFeature,
  (state: Drawer.DrawingActionState) => state.color
);

export const getFontNames = createSelector(
  drawingActionFeature,
  (state: Drawer.DrawingActionState) => state.fontNames
);

export const getFontFamily = createSelector(
  drawingActionFeature,
  (state: Drawer.DrawingActionState) => state.fontFamily
);

export const getFontSize = createSelector(
  drawingActionFeature,
  (state: Drawer.DrawingActionState) => state.fontSize
);
