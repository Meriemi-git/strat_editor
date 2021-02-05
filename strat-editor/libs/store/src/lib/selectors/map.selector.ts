import { createSelector, createFeatureSelector } from '@ngrx/store';
import { selectAll } from '../reducers/map.reducer';
import { MapState } from '../states/map.state';

const mapFeature = createFeatureSelector<MapState>('MapState');
export const getMapState = createSelector(
  mapFeature,
  (state: MapState) => state
);
export const getMapsLoading = createSelector(
  getMapState,
  (state: MapState) => state.loaded
);
export const getAllMaps = createSelector(mapFeature, selectAll);

export const getMapByName = createSelector(getAllMaps, (maps, name) =>
  maps.filter((x) => x.name === name)
);

export const getMapById = createSelector(getAllMaps, (maps, id) => {
  return maps.find((x) => x._id === id);
});
export const getSelectedMap = createSelector(
  getMapState,
  (state: MapState) => state.selectedMap
);
export const getSelectedFloor = createSelector(
  getMapState,
  (state: MapState) => state.selectedFloor
);
