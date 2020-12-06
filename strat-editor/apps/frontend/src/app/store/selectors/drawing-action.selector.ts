import { createSelector, createFeatureSelector } from '@ngrx/store';
import { StratEditorState } from '../reducers';
import { DrawingActionState } from '../reducers/drawer.reducer';

const drawingActionFeature = createFeatureSelector<StratEditorState,DrawingActionState>('DrawingActionState');
export const selectDAState = createSelector(drawingActionFeature,(state: DrawingActionState) => state);
export const getSelectedAction = createSelector(selectDAState,(state: DrawingActionState) => state.selected);
export const getPreviousAction = createSelector(selectDAState,(state: DrawingActionState) => state.history.length > 1 ? state.history[state.historyIndex] : null);
