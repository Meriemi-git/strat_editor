import * as actions from '../actions/drawer.action';
import { createReducer, on, Action } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import {
  DrawerColor,
  DrawerActionType,
  DrawerAction,
} from '@strat-editor/data';
import { DrawerState } from '../states/drawer.state';

export const adapter: EntityAdapter<DrawerAction> = createEntityAdapter<
  DrawerAction
>({
  sortComparer: sortByName,
  selectId: (action: DrawerAction) => action.name,
});

export function sortByName(a: DrawerAction, b: DrawerAction): number {
  return a.name.localeCompare(b.name);
}

export const initialstate: DrawerState = adapter.getInitialState({
  drawerAction: null,
  optionAction: null,
  color: new DrawerColor(),
  fontNames: [],
  fontFamily: 'Amiri',
  fontSize: 80,
  drawingMode: null,
});

const drawingActionReducer = createReducer(
  initialstate,
  on(actions.FetchDrawerActions, (state) => ({
    ...state,
  })),
  on(actions.FetchDrawerActionsSuccess, (state, { actions }) => {
    return adapter.addMany(actions, { ...state });
  }),
  on(actions.FetchFontNames, (state) => ({
    ...state,
  })),
  on(actions.FetchFontNamesSuccess, (state, { fontNames }) => ({
    ...state,
    fontNames: fontNames,
  })),
  on(actions.SetFontFamily, (state, { fontFamily }) => ({
    ...state,
    fontFamily: fontFamily,
  })),
  on(actions.SetFontSize, (state, { fontSize }) => ({
    ...state,
    fontSize: fontSize,
  })),
  on(actions.SetDrawerAction, (state, { action }) => {
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
      drawerAction:
        action.type !== DrawerActionType.SETTING ? action : state.drawerAction,
    });
  }),
  on(actions.SetOptions, (state, { optionAction }) => {
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
  on(actions.SetColor, (state, { color }) => ({
    ...state,
    color: color,
  })),
  on(actions.UnSelectDrawerAction, (state) => {
    let updatedActions = adapter
      .getSelectors()
      .selectAll(state)
      .map((someAction) => {
        const isActive =
          someAction.type === DrawerActionType.SETTING
            ? someAction.active
            : someAction.name === 'selection'
            ? true
            : false;
        let updatedAction = Object.assign({}, someAction, {
          active: isActive,
        });
        return { id: updatedAction.name, changes: updatedAction };
      });
    return adapter.updateMany(updatedActions, {
      ...state,
      drawerAction: adapter
        .getSelectors()
        .selectAll(state)
        .find((action) => action.name === 'selection'),
    });
  }),
  on(actions.SetDrawingMode, (state, { drawingMode }) => ({
    ...state,
    drawingMode: drawingMode,
  }))
);

export function reducer(state: DrawerState | undefined, action: Action) {
  return drawingActionReducer(state, action);
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = adapter.getSelectors();

export const selectAllActions = selectAll;
