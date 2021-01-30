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
  editing: null,
  error: null,
});

const stratReducer = createReducer(
  initialstate,
  on(actions.GetStrats, (state) => ({
    ...state,
  })),
  on(actions.GetStratsSuccess, (state, { strats }) => {
    return adapter.addMany(strats, { ...state, error: null });
  }),
  on(actions.GetStratsError, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(actions.UploadStrat, (state, { strat }) => ({
    ...state,
    error: null,
    editing: strat,
  })),
  on(actions.UploadStratSuccess, (state, { strat }) => {
    return adapter.addOne(strat, { ...state, editing: strat, error: null });
  }),
  on(actions.UploadStratError, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(actions.UpdateStrat, (state, { strat }) => ({
    ...state,
    error: null,
    editing: strat,
  })),
  on(actions.UpdateStratSuccess, (state, { strat }) => {
    return adapter.addOne(strat, { ...state, editing: strat, error: null });
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
    editing: null,
  })),
  on(actions.DeleteStratError, (state, { error }) => ({
    ...state,
    error: error,
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

export const selectAllStrats = selectAll;
