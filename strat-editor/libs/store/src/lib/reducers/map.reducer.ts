import { Map } from '@strat-editor/data';
import * as actions from '../actions/map.action';
import { createReducer, on, Action } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { MapState } from '../states/map.state';

export const adapter: EntityAdapter<Map> = createEntityAdapter<Map>({
  sortComparer: sortByName,
  selectId: (map: Map) => map._id,
});

export function sortByName(a: Map, b: Map): number {
  return a.name.localeCompare(b.name);
}

export const initialstate: MapState = adapter.getInitialState({
  error: null,
  loaded: false,
  selectedMap: null,
  selectedFloor: null,
});

const mapReducer = createReducer(
  initialstate,
  on(actions.FetchMaps, (state) => ({
    ...state,
    loaded: true,
  })),
  on(actions.FetchMapsSuccess, (state, { maps }) => {
    return adapter.addMany(maps, { ...state, loading: false, error: null });
  }),
  on(actions.FetchMapsError, (state, { error }) => ({
    ...state,
    loading: false,
    isLoaded: false,
    error: error,
  })),
  on(actions.SelectMap, (state, { map }) => ({
    ...state,
    selectedMap: map,
  })),
  on(actions.SelectFloor, (state, { floor }) => ({
    ...state,
    selectedFloor: floor,
  })),
  on(actions.ClearMapState, (state) => ({
    ...state,
    error: null,
    loaded: false,
    selectedMap: null,
    selectedFloor: null,
  }))
);

export function reducer(state: MapState | undefined, action: Action) {
  return mapReducer(state, action);
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = adapter.getSelectors();

export const selectAllMaps = selectAll;
