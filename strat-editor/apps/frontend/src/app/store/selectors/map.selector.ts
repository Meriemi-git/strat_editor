import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as Map from '../reducers/map.reducer';

const mapFeature = createFeatureSelector<Map.MapState>('MapState');
export const getMapState = createSelector(
  mapFeature,
  (state: Map.MapState) => state
);
export const getMapsLoading = createSelector(
  getMapState,
  (state: Map.MapState) => state.loaded
);
export const getAllMaps = createSelector(mapFeature, Map.selectAll);
export const getMapByName = createSelector(getAllMaps, (maps, name) =>
  maps.filter((x) => x.name === name)
);
export const getSelectedMap = createSelector(
  getMapState,
  (state: Map.MapState) => state.selectedMap
);
