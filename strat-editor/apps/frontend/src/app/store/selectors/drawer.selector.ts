import { createSelector, createFeatureSelector } from '@ngrx/store';
import { StratEditorState } from '../reducers';
import { DrawingActionState } from '../reducers/drawer.reducer';

const drawingActionFeature = createFeatureSelector<
  StratEditorState,
  DrawingActionState
>('DrawerState');
export const selectDrawerState = createSelector(
  drawingActionFeature,
  (state: DrawingActionState) => state
);
export const getSelectedAction = createSelector(
  selectDrawerState,
  (state: DrawingActionState) => state.selected
);
export const getPreviousAction = createSelector(
  selectDrawerState,
  (state: DrawingActionState) =>
    state.history.length > 1 ? state.history[state.historyIndex] : null
);
export const getColor = createSelector(
  drawingActionFeature,
  (state: DrawingActionState) => state.color
);
