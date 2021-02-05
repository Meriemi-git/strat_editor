import { createAction, props } from '@ngrx/store';

export const SaveCanvasState = createAction(
  '[Canvas] Save canvas state',
  props<{ canvasState: string }>()
);

export const UndoCanvasState = createAction('[Canvas] Undo canvas state');

export const RedoCanvasState = createAction('[Canvas] Redo canvas state');
