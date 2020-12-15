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
  (state: Drawer.DrawingActionState) => state.selected
);
export const getSelectedOption = createSelector(
  selectDrawerState,
  (state: Drawer.DrawingActionState) => state.options
);
export const getPreviousAction = createSelector(
  selectDrawerState,
  (state: Drawer.DrawingActionState) =>
    state.history.length > 1 ? state.history[state.historyIndex] : null
);
export const getColor = createSelector(
  drawingActionFeature,
  (state: Drawer.DrawingActionState) => state.color
);
