import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Layer, PageOptions, Strat, StratFilter } from '@strat-editor/data';
import { PaginateResult } from 'mongoose';

export const GetStratPage = createAction(
  '[Strats] Get Strat page',
  props<{ pageOptions: PageOptions; stratFilter: StratFilter }>()
);

export const GetStratPageSuccess = createAction(
  '[Strats] Get Strat page result Success',
  props<{ pageResults: PaginateResult<Strat> }>()
);

export const GetStratPageError = createAction(
  '[Strats] Get Strat page result Error',
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

export const DeleteStratSuccess = createAction(
  '[Strats] Delete Strat Success',
  props<{ stratId: string }>()
);

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

export const UpdateStratInfosAndSave = createAction(
  '[Strats] Update Strat Infos and Save',
  props<{ name: string; description: string; isPublic: boolean }>()
);

export const SetCurrentLayer = createAction(
  '[Strats] Set current layer',
  props<{ layer: Layer }>()
);

export const ClearStratState = createAction('[Strats] Clear strat state');
