import { createAction, props, union } from '@ngrx/store';
import { Floor, Map } from '@strat-editor/data';

export const FetchMaps = createAction('[Map] Fetch Maps');

export const FetchMapsSuccess = createAction(
  '[Map] Fetch Maps Success',
  props<{ maps: Map[] }>()
);

export const FetchMapsError = createAction(
  '[Map] Fetch Maps Error',
  props<{ error: string }>()
);

export const SelectMap = createAction(
  '[Map] Select Map',
  props<{ map: Map }>()
);

export const SelectFloor = createAction(
  '[Map] Select Floor',
  props<{ floor: Floor }>()
);

export const ClearMapState = createAction('[Map] Clear Map state');
