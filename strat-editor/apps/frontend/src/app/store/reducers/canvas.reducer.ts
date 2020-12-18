import * as actions from '../actions/canvas.action';
import { createReducer, on, Action } from '@ngrx/store';

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface CanvasState {
  history: string[];
  historyIndex: number;
  currentState: string;
  backgroundImage: string;
  zoom: number;
}

export const initialstate: CanvasState = {
  history: [],
  currentState: '',
  historyIndex: -1,
  backgroundImage: 'string',
  zoom: 0,
};

const drawingActionReducer = createReducer(
  initialstate,
  on(actions.SaveCanvasState, (state, { canvasState }) => ({
    ...state,
    historyIndex: state.historyIndex + 1,
    history: [...state.history.slice(0, state.historyIndex + 1), canvasState],
  })),
  on(actions.UndoCanvasState, (state) => ({
    ...state,
    historyIndex:
      state.historyIndex > 0 ? state.historyIndex - 1 : state.historyIndex,
    currentState:
      state.historyIndex >= 0 && state.history.length >= 0
        ? state.history[state.historyIndex - 1]
        : null,
  })),
  on(actions.RedoCanvasState, (state) => ({
    ...state,
    historyIndex:
      state.history.length > state.historyIndex + 1
        ? state.historyIndex + 1
        : state.historyIndex,
    currentState:
      state.history.length > state.historyIndex && state.history.length >= 0
        ? state.history[state.historyIndex + 1]
        : null,
  }))
);

export function reducer(state: CanvasState | undefined, action: Action) {
  return drawingActionReducer(state, action);
}
