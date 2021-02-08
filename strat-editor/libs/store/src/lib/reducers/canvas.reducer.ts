import * as actions from '../actions/canvas.action';
import { createReducer, on, Action } from '@ngrx/store';
import { CanvasState } from '../states/canvas.state';

export const initialstate: CanvasState = {
  history: [],
  canvas: null,
  historyIndex: -1,
};

const drawingActionReducer = createReducer(
  initialstate,
  on(actions.SaveCanvas, (state, { canvas }) => ({
    ...state,
    historyIndex: state.historyIndex + 1,
    history: [...state.history.slice(0, state.historyIndex + 1), canvas],
    canvas: canvas,
  })),
  on(actions.UndoCanvasState, (state) => ({
    ...state,
    historyIndex:
      state.historyIndex > 0 ? state.historyIndex - 1 : state.historyIndex,
    canvas:
      state.historyIndex > 0 && state.history.length > 0
        ? state.history[state.historyIndex - 1]
        : state.canvas,
  })),
  on(actions.RedoCanvasState, (state) => ({
    ...state,
    historyIndex:
      state.history.length > state.historyIndex + 1
        ? state.historyIndex + 1
        : state.historyIndex,
    canvas:
      state.history.length > state.historyIndex + 1 && state.history.length > 0
        ? state.history[state.historyIndex + 1]
        : state.canvas,
  }))
);

export function reducer(state: CanvasState | undefined, action: Action) {
  return drawingActionReducer(state, action);
}
