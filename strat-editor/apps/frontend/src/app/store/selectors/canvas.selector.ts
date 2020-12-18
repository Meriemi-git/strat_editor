import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as Canvas from '../reducers/canvas.reducer';

const canvasFeature = createFeatureSelector<Canvas.CanvasState>('CanvasState');

export const selectCanvasState = createSelector(
  canvasFeature,
  (state: Canvas.CanvasState) => state
);

export const getPreviousAction = createSelector(
  selectCanvasState,
  (state: Canvas.CanvasState) =>
    state.history.length > 1 ? state.history[state.historyIndex] : null
);

export const getCurrentCanvasState = createSelector(
  selectCanvasState,
  (state: Canvas.CanvasState) => state.currentState
);
