import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CanvasState } from '../states/canvas.state';
const canvasFeature = createFeatureSelector<CanvasState>('CanvasState');

export const getCanvasState = createSelector(
  canvasFeature,
  (state: CanvasState) => state
);

export const getCanvas = createSelector(
  getCanvasState,
  (state: CanvasState) => state.canvas
);
