import * as actions from '../actions/drawer.action';
import { createReducer, on, Action } from '@ngrx/store';
import { DrawingAction } from '@strat-editor/drawing-editor';

export interface DrawingActionState{
  selected: DrawingAction;
  history: DrawingAction[];
  historyIndex : number;
}


export const initialstate: DrawingActionState = {
  selected : null,
  history : [],
  historyIndex : 0
};

const drawingActionReducer = createReducer(
  initialstate,
  on(actions.PerformDrawingAction,(state, { action }) => ({
    ...state,
    selected : action,
    historyIndex : state.historyIndex + 1,
    history: [...state.history.slice(0,state.historyIndex),action]
  })),
  on(actions.UndoDrawingAction, (state) => ({
    ...state,
    selected : null
  })),
  on(actions.UndoDrawingAction, (state) => ({
    ...state,
    historyIndex : state.historyIndex >= 0 ? state.historyIndex - 1 : state.historyIndex,
    selected : state.historyIndex >= 0 && state.history.length >= 0 ? state.history[state.historyIndex -1] : null,
  })),
  on(actions.RedoDrawingAction, (state) => ({
    ...state,
    historyIndex : state.history.length > state.historyIndex ? state.historyIndex + 1 : state.historyIndex,
    selected : state.history.length >= 0 ? state.history[state.historyIndex + 1] : null
  })),
)

export function reducer(state: DrawingActionState | undefined, action: Action) {
  return drawingActionReducer(state, action);
}

