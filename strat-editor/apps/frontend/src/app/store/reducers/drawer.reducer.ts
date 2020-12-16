import * as actions from '../actions/drawer.action';
import { createReducer, on, Action } from '@ngrx/store';
import {
  DrawerColor,
  DrawerAction,
  DrawerActionType,
} from '@strat-editor/drawing-editor';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface DrawingActionState extends EntityState<DrawerAction> {
  color: DrawerColor;
  selected: DrawerAction | null;
  optionAction: DrawerAction | null;
  history: DrawerAction[];
  historyIndex: number;
}

export const adapter: EntityAdapter<DrawerAction> = createEntityAdapter<
  DrawerAction
>({
  sortComparer: sortByName,
  selectId: (action: DrawerAction) => action.name,
});

export function sortByName(a: DrawerAction, b: DrawerAction): number {
  return a.name.localeCompare(b.name);
}

export const initialstate: DrawingActionState = adapter.getInitialState({
  selected: null,
  optionAction: null,
  history: [],
  historyIndex: 0,
  color: new DrawerColor(),
});

const drawingActionReducer = createReducer(
  initialstate,
  on(actions.FetchDrawerActions, (state) => ({
    ...state,
  })),
  on(actions.FetchDrawerActionsSuccess, (state, { actions }) => {
    return adapter.addMany(actions, { ...state });
  }),
  on(actions.SelectDrawerAction, (state, { action }) => ({
    ...state,
    selected: action,
  })),
  on(actions.SetDrawerOptions, (state, { optionAction }) => {
    let activeOption = Object.assign({}, optionAction, {
      active: !optionAction.active,
    });
    let updatedOption = {
      id: optionAction.name,
      changes: activeOption,
    };
    return adapter.updateOne(updatedOption, {
      ...state,
      optionAction: activeOption,
    });
  }),
  on(actions.PerformDrawerAction, (state, { action }) => {
    let updatedActions = adapter
      .getSelectors()
      .selectAll(state)
      .map((someAction) => {
        let updatedAction = Object.assign({}, someAction, {
          active:
            someAction.type !== DrawerActionType.SETTING
              ? someAction.name === action.name
              : someAction.active,
        });
        return { id: updatedAction.name, changes: updatedAction };
      });
    return adapter.updateMany(updatedActions, {
      ...state,
      selected:
        action.type !== DrawerActionType.SETTING ? action : state.selected,
      historyIndex: state.historyIndex + 1,
      history: [...state.history.slice(0, state.historyIndex), action],
    });
  }),
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

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = adapter.getSelectors();

export const selectAllActions = selectAll;
