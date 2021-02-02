import { createAction, props } from '@ngrx/store';
import { DrawerColor, DrawingMode, DrawerAction } from '@strat-editor/data';

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

export const SetColor = createAction(
  '[DrawerAction] Select Color Action',
  props<{ color: DrawerColor }>()
);

export const SetDrawingMode = createAction(
  '[DrawerAction] Set Drawing State',
  props<{ drawingMode: DrawingMode }>()
);
