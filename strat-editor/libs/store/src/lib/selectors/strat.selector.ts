import { createSelector, createFeatureSelector } from '@ngrx/store';
import { selectAll } from '../reducers/strat.reducer';
import { StratState } from '../states/strat.state';

const stratFeature = createFeatureSelector<StratState>('StratState');
export const getStratState = createSelector(
  stratFeature,
  (state: StratState) => state
);
export const selectAllStrats = createSelector(stratFeature, selectAll);

export const getCurrentStrat = createSelector(
  getStratState,
  (state: StratState) => state.currentStrat
);
