import { Strat } from '@strat-editor/data';
import * as actions from '../actions/strat.action';
import { createReducer, on, Action } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { StratState } from '../states/strat.state';

export const adapter: EntityAdapter<Strat> = createEntityAdapter<Strat>({
  sortComparer: sortByName,
  selectId: (strat: Strat) => strat._id,
});

export function sortByName(a: Strat, b: Strat): number {
  return a.name.localeCompare(b.name);
}

export const initialstate: StratState = adapter.getInitialState({
  error: null,
  currentStrat: null,
  modified: false,
});

const stratReducer = createReducer(
  initialstate,
  on(actions.GetMyStrats, (state) => ({
    ...state,
  })),
  on(actions.GetMyStratsSuccess, (state, { strats }) => {
    return adapter.addMany(strats, { ...state, error: null });
  }),
  on(actions.GetMyStratsError, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(actions.SaveStrat, (state, { strat }) => ({
    ...state,
    error: null,
    currentStrat: strat,
  })),
  on(actions.SaveStratSuccess, (state, { strat }) => {
    return adapter.addOne(strat, { ...state, editing: strat, error: null });
  }),
  on(actions.SaveStratError, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(actions.UpdateStrat, (state, { strat }) => ({
    ...state,
    error: null,
    currentStrat: strat,
  })),
  on(actions.UpdateStratSuccess, (state, { strat }) => {
    return adapter.addOne(strat, {
      ...state,
      currentStrat: strat,
      error: null,
    });
  }),
  on(actions.UpdateStratError, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(actions.DeleteStrat, (state) => ({
    ...state,
    error: null,
  })),
  on(actions.DeleteStratSuccess, (state) => ({
    ...state,
    currentStrat: null,
  })),
  on(actions.DeleteStratError, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(actions.EditStrat, (state, { strat }) => ({
    ...state,
    currentStrat: strat,
    error: null,
  })),
  on(actions.LoadStrat, (state, { strat }) => ({
    ...state,
    error: null,
    currentStrat: strat,
  })),
  on(actions.CreateStrat, (state, { strat }) => ({
    ...state,
    error: null,
    currentStrat: strat,
  }))
);

export function reducer(state: StratState | undefined, action: Action) {
  return stratReducer(state, action);
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = adapter.getSelectors();
