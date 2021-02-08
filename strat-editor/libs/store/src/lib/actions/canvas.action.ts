import { createAction, props } from '@ngrx/store';

export const SaveCanvas = createAction(
  '[Canvas] Save canvas state',
  props<{ canvas: string }>()
);

export const UndoCanvasState = createAction('[Canvas] Undo canvas state');

export const RedoCanvasState = createAction('[Canvas] Redo canvas state');
