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

export const getLoadedStrat = createSelector(
  getStratState,
  (state: StratState) => state.loadedStrat
);

export const getStratById = createSelector(
  selectAllStrats,
  (strats, stratId) => {
    return strats.find((x) => x._id === stratId);
  }
);
