import { createAction, props, union } from '@ngrx/store';
import { DrawerColor, DrawerAction } from '@strat-editor/drawing-editor';

export const UnSelectDrawerAction = createAction(
  '[DrawerAction] Unselect Drawer Action'
);

export const SetDrawerAction = createAction(
  '[DrawerAction] Select Drawer Action',
  props<{ action: DrawerAction }>()
);

export const SetOptions = createAction(
  '[DrawerAction] Set Drawer Options',
  props<{ optionAction: DrawerAction }>()
);

export const FetchFontNames = createAction('[DrawerAction] Fetch font names');

export const FetchFontNamesSuccess = createAction(
  '[DrawerAction] Fetch font names success',
  props<{ fontNames: string[] }>()
);

export const SetFontFamily = createAction(
  '[DrawerAction] Set font family',
  props<{ fontFamily: string }>()
);

export const SetFontSize = createAction(
  '[DrawerAction] Set font size',
  props<{ fontSize: number }>()
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

export const SetColor = createAction(
  '[DrawerAction] Select Color Action',
  props<{ color: DrawerColor }>()
);

const actions = union({
  AddAllActions: FetchDrawerActions,
  PerformDrawerAction,
  UndoDrawerAction,
  RedoDrawerAction,
  SetColorAction: SetColor,
});

export type DrawerActions = typeof actions;
