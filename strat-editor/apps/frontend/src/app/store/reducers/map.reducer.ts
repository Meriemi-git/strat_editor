import {Map} from "@strat-editor/data"
import * as actions from '../actions/map.action';
import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity"

export interface MapState extends EntityState<Map>{
  loaded: boolean;
  error: string;
  selectedMap : Map;
}

export const adapter : EntityAdapter<Map> =
   createEntityAdapter<Map>({
    sortComparer: sortByName,
    selectId: (map: Map) => map._id
  });

export function sortByName(a: Map, b: Map): number {
  return a.name.localeCompare(b.name);
}

export const initialstate: MapState = adapter.getInitialState({
  error : null,
  loaded : false,
  selectedMap : null
});

const mapReducer = createReducer(
  initialstate,
  on(actions.FetchMaps, state => ({
    ...state,
    loaded: true
  })),
  on(actions.FetchMapsSuccess, (state, { maps }) => {
    return adapter.addMany(maps, { ...state, loading: false, error: null });
  }),
  on(actions.FetchMapsError, (state, { error }) => ({
    ...state,
    loading : false,
    isLoaded : false,
    error: error
  })),
  on(actions.SelectMap, (state, { selectedMap }) => ({
    ...state,
    selectedMap: selectedMap
  })),
)

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

