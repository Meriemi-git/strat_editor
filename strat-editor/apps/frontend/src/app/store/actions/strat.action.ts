import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Strat } from '@strat-editor/data';

export const GetStrats = createAction(
  '[Strats] Get Strats',
  props<{ userId: string }>()
);

export const GetStratsSuccess = createAction(
  '[Strats] Get Strats Success',
  props<{ strats: Strat[] }>()
);

export const GetStratsError = createAction(
  '[Strats] Get Strats Error',
  props<{ error: HttpErrorResponse }>()
);

export const UploadStrat = createAction(
  '[Strats] Upload Strat',
  props<{ strat: Strat }>()
);

export const UploadStratSuccess = createAction(
  '[Strats] Upload Strat Success',
  props<{ strat: Strat }>()
);

export const UploadStratError = createAction(
  '[Strats] Upload Strat Error',
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
