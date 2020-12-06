import { createAction, props, union } from '@ngrx/store';
import { Map } from '@strat-editor/data';

export const FetchMaps = createAction(
  '[Map] Fetch Maps'
);

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
  props<{ selectedMap: Map }>()
);

const actions = union({
  FetchMaps,
  FetchMapsSuccess,
  FetchMapsError,
  SelectMap
});


export type MapActions = typeof actions;
