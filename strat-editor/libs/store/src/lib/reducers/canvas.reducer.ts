import * as actions from '../actions/canvas.action';
import { createReducer, on, Action } from '@ngrx/store';
import { CanvasState } from '../states/canvas.state';

export const initialstate: CanvasState = {
  history: [],
  currentState: null,
  historyIndex: -1,
};

const drawingActionReducer = createReducer(
  initialstate,
  on(actions.SaveCanvasState, (state, { canvasState }) => ({
    ...state,
    historyIndex: state.historyIndex + 1,
    history: [...state.history.slice(0, state.historyIndex + 1), canvasState],
    currentState: canvasState,
  })),
  on(actions.UndoCanvasState, (state) => ({
    ...state,
    historyIndex:
      state.historyIndex > 0 ? state.historyIndex - 1 : state.historyIndex,
    currentState:
      state.historyIndex > 0 && state.history.length > 0
        ? state.history[state.historyIndex - 1]
        : state.currentState,
  })),
  on(actions.RedoCanvasState, (state) => ({
    ...state,
    historyIndex:
      state.history.length > state.historyIndex + 1
        ? state.historyIndex + 1
        : state.historyIndex,
    currentState:
      state.history.length > state.historyIndex + 1 && state.history.length > 0
        ? state.history[state.historyIndex + 1]
        : state.currentState,
  }))
);

export function reducer(state: CanvasState | undefined, action: Action) {
  return drawingActionReducer(state, action);
}
