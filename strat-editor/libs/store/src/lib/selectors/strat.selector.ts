import { createSelector, createFeatureSelector } from '@ngrx/store';
import { selectAll } from '../reducers/strat.reducer';
import { StratState } from '../states/strat.state';

const stratFeature = createFeatureSelector<StratState>('StratState');
export const getStratState = createSelector(
  stratFeature,
  (state: StratState) => state
);
export const selectAllStrats = createSelector(stratFeature, selectAll);

export const getStrat = createSelector(
  getStratState,
  (state: StratState) => state.strat
);

export const getStratAction = createSelector(
  getStratState,
  (state: StratState) => state.action
);

export const getStratById = createSelector(
  selectAllStrats,
  (strats, stratId) => {
    return strats.find((x) => x._id === stratId);
  }
);

export const getCurrentLayer = createSelector(
  getStratState,
  (state: StratState) => state.layer
);

export const getStratAndAction = createSelector(
  getStratState,
  (state: StratState) => ({ strat: state.strat, action: state.action })
);

export const getStratPageMetadata = createSelector(
  getStratState,
  (state: StratState) => state.pageMetadata
);
