import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CanvasState } from '../states/canvas.state';
const canvasFeature = createFeatureSelector<CanvasState>('CanvasState');

export const selectCanvasState = createSelector(
  canvasFeature,
  (state: CanvasState) => state
);

export const getPreviousAction = createSelector(
  selectCanvasState,
  (state: CanvasState) =>
    state.history.length > 1 ? state.history[state.historyIndex] : null
);

export const getCurrentCanvasState = createSelector(
  selectCanvasState,
  (state: CanvasState) => state.currentState
);
