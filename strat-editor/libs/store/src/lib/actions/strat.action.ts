import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Strat } from '@strat-editor/data';

export const GetMyStrats = createAction(
  '[Strats] Get Strats',
  props<{ userId: string }>()
);

export const GetMyStratsSuccess = createAction(
  '[Strats] Get Strats Success',
  props<{ strats: Strat[] }>()
);

export const GetMyStratsError = createAction(
  '[Strats] Get Strats Error',
  props<{ error: HttpErrorResponse }>()
);

export const CreateStrat = createAction(
  '[Strats] Create Strat',
  props<{ strat: Strat }>()
);

export const SaveStrat = createAction(
  '[Strats] Save Strat',
  props<{ strat: Strat }>()
);

export const SaveStratSuccess = createAction(
  '[Strats] Save Strat Success',
  props<{ strat: Strat }>()
);

export const SaveStratError = createAction(
  '[Strats] Save Strat Error',
  props<{ error: HttpErrorResponse }>()
);

export const UpdateStrat = createAction(
  '[Strats] Update Strat',
  props<{ strat: Strat }>()
);

export const UpdateStratSuccess = createAction(
  '[Strats] Update Strat Success',
  props<{ strat: Strat }>()
);

export const UpdateStratError = createAction(
  '[Strats] Update Strat Error',
  props<{ error: HttpErrorResponse }>()
);

export const DeleteStrat = createAction(
  '[Strats] Delete Strat',
  props<{ stratId: string }>()
);

export const DeleteStratSuccess = createAction('[Strats] Delete Strat Success');

export const DeleteStratError = createAction(
  '[Strats] Delete Strat Error',
  props<{ error: HttpErrorResponse }>()
);

export const EditStrat = createAction(
  '[Strats] Edit Strat',
  props<{ strat: Strat }>()
);

export const LoadStrat = createAction(
  '[Strats] Load Strat',
  props<{ strat: Strat }>()
);
