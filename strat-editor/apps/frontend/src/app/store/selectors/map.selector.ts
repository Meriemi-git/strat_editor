import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as Map from '../reducers/map.reducer';


const mapFeature = createFeatureSelector<Map.MapState>('MapState');
export const selectMapState = createSelector(mapFeature,(state: Map.MapState) => state);
export const selectMapsLoading = createSelector(selectMapState,(state: Map.MapState) => state.loaded);
export const selectAllMaps = createSelector(mapFeature, Map.selectAll);
export const selectMapByName = createSelector(selectAllMaps,(maps,name) => maps.filter(x => x.name === name))
export const getSelectedMap = createSelector(selectMapState,(state: Map.MapState) => state.selectedMap);

