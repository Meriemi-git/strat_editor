import { createAction, props, union } from '@ngrx/store';
import { Color, DrawerAction } from '@strat-editor/drawing-editor';

export const UnSelectDrawerAction = createAction(
  '[DrawerAction] Unselect DrawerAction'
);

export const PerformDrawerAction = createAction(
  '[DrawerAction] Perform DrawerAction',
  props<{ action: DrawerAction }>()
);

export const UndoDrawerAction = createAction(
  '[DrawerAction] Undo DrawerAction'
);

export const RedoDrawerAction = createAction(
  '[DrawerAction] Redo DrawerAction'
);

export const SetColorAction = createAction(
  '[DrawerAction] Select ColorAction',
  props<{ color: Color }>()
);

const actions = union({
  PerformDrawerAction,
  UndoDrawerAction,
  RedoDrawerAction,
  SetColorAction,
});

export type DrawerActions = typeof actions;
