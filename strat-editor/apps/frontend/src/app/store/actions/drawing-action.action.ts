import { createAction, props, union } from '@ngrx/store';
import { DrawingAction } from '../../drawer/actions';

export const SelectDrawingAction = createAction(
  '[DrawingAction] Select DrawingAction',
  props<{ action: DrawingAction }>()
);

export const UnSelectDrawingAction = createAction(
  '[DrawingAction] Unselect DrawingAction'
);

export const PerformSelectedDrawingAction = createAction(
  '[DrawingAction] Perform Selected DrawingAction',
  props<{ action: DrawingAction }>()
);

export const UndoDrawingAction = createAction(
  '[DrawingAction] Undo DrawingAction',
);

export const RedoDrawingAction = createAction(
  '[DrawingAction] Redo DrawingAction'
);
