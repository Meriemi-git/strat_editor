import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Layer, Strat } from '@strat-editor/data';

export const GetMyStrats = createAction('[Strats] Get My Strats');

export const GetMyStratsSuccess = createAction(
  '[Strats] Get My Strats Success',
  props<{ strats: Strat[] }>()
);

export const GetMyStratsError = createAction(
  '[Strats] Get My Strats Error',
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

export const LoadStrat = createAction(
  '[Strats] Load Strat',
  props<{ stratId: string }>()
);

export const LoadStratSuccess = createAction(
  '[Strats] Load Strat success',
  props<{ strat: Strat }>()
);

export const LoadStratError = createAction(
  '[Strats] Load Strat error',
  props<{ error: HttpErrorResponse }>()
);

export const UpdateStratLayer = createAction(
  '[Strats] Update Strat layer',
  props<{ canvas: string; floorId: string; floorName: string }>()
);

export const UpdateStratInfos = createAction(
  '[Strats] Update Strat Infos',
  props<{ name: string; description: string; isPublic: boolean }>()
);

export const SetCurrentLayer = createAction(
  '[Strats] Set current layer',
  props<{ layer: Layer }>()
);

export const ClearStratState = createAction('[Strats] Clear strat state');
