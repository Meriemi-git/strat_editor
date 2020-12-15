import { createAction, props, union } from '@ngrx/store';
import { Color, DrawerAction } from '@strat-editor/drawing-editor';

export const UnSelectDrawerAction = createAction(
  '[DrawerAction] Unselect Drawer Action'
);

export const SelectDrawerAction = createAction(
  '[DrawerAction] Select Drawer Action',
  props<{ action: DrawerAction }>()
);

export const SetDrawerOptions = createAction(
  '[DrawerAction] Set Drawer Options',
  props<{ options: DrawerAction }>()
);

export const FetchDrawerActions = createAction(
  '[DrawerAction] Fetch Drawer Action'
);

export const FetchDrawerActionsSuccess = createAction(
  '[DrawerAction] Fetch Drawer Action success',
  props<{ actions: DrawerAction[] }>()
);

export const PerformDrawerAction = createAction(
  '[DrawerAction] Perform Drawer Action',
  props<{ action: DrawerAction }>()
);

export const UndoDrawerAction = createAction(
  '[DrawerAction] Undo Drawer Action'
);

export const RedoDrawerAction = createAction(
  '[DrawerAction] Redo Drawer Action'
);

export const SetColorAction = createAction(
  '[DrawerAction] Select Color Action',
  props<{ color: Color }>()
);

const actions = union({
  AddAllActions: FetchDrawerActions,
  PerformDrawerAction,
  UndoDrawerAction,
  RedoDrawerAction,
  SetColorAction,
});

export type DrawerActions = typeof actions;
