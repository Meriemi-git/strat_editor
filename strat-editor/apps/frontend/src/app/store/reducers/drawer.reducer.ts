import * as actions from '../actions/drawer.action';
import { createReducer, on, Action } from '@ngrx/store';
import { Color, DrawerAction } from '@strat-editor/drawing-editor';

export interface DrawingActionState {
  color: Color;
  selected: DrawerAction;
  history: DrawerAction[];
  historyIndex: number;
}

export const initialstate: DrawingActionState = {
  color: new Color(),
  selected: null,
  history: [],
  historyIndex: 0,
};

const drawingActionReducer = createReducer(
  initialstate,
  on(actions.PerformDrawerAction, (state, { action }) => ({
    ...state,
    selected: action,
    historyIndex: state.historyIndex + 1,
    history: [...state.history.slice(0, state.historyIndex), action],
  })),
  on(actions.UndoDrawerAction, (state) => ({
    ...state,
    selected: null,
  })),
  on(actions.UndoDrawerAction, (state) => ({
    ...state,
    historyIndex:
      state.historyIndex >= 0 ? state.historyIndex - 1 : state.historyIndex,
    selected:
      state.historyIndex >= 0 && state.history.length >= 0
        ? state.history[state.historyIndex - 1]
        : null,
  })),
  on(actions.RedoDrawerAction, (state) => ({
    ...state,
    historyIndex:
      state.history.length > state.historyIndex
        ? state.historyIndex + 1
        : state.historyIndex,
    selected:
      state.history.length >= 0 ? state.history[state.historyIndex + 1] : null,
  })),
  on(actions.SetColorAction, (state, { color }) => ({
    ...state,
    color: color,
  }))
);

export function reducer(state: DrawingActionState | undefined, action: Action) {
  return drawingActionReducer(state, action);
}
