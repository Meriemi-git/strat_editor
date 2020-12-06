import { createAction, props, union } from '@ngrx/store';
import { DrawingAction } from '@strat-editor/drawing-editor';

export const UnSelectDrawingAction = createAction(
  '[DrawingAction] Unselect DrawingAction',
);

export const PerformDrawingAction = createAction(
  '[DrawingAction] Perform DrawingAction',
  props<{ action: DrawingAction }>()
);

export const UndoDrawingAction = createAction(
  '[DrawingAction] Undo DrawingAction',
);

export const RedoDrawingAction = createAction(
  '[DrawingAction] Redo DrawingAction'
);

const actions = union({
  PerformDrawingAction,
  UndoDrawingAction,
  RedoDrawingAction
});


export type DrawingActions = typeof actions;

