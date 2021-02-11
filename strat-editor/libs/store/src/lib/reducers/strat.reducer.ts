import { Layer, Strat, StratAction } from '@strat-editor/data';
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
  strat: null,
  action: null,
  layer: null,
});

const stratReducer = createReducer(
  initialstate,
  on(actions.GetMyStrats, (state) => ({
    ...state,
    action: null,
  })),
  on(actions.GetMyStratsSuccess, (state, { strats }) => {
    return adapter.addMany(strats, { ...state, error: null });
  }),
  on(actions.GetMyStratsError, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(actions.SaveStrat, (state) => ({
    ...state,
    error: null,
    action: StratAction.SAVE,
  })),
  on(actions.SaveStratSuccess, (state, { strat }) => {
    return adapter.addOne(strat, {
      ...state,
      error: null,
      strat: strat,
    });
  }),
  on(actions.SaveStratError, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(actions.UpdateStrat, (state) => ({
    ...state,
    error: null,
  })),
  on(actions.UpdateStratSuccess, (state, { strat }) => {
    return adapter.addOne(strat, {
      ...state,
      strat: strat,
      action: StratAction.UPDATE,
      error: null,
    });
  }),
  on(actions.UpdateStratError, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(actions.DeleteStrat, (state) => ({
    ...state,
  })),
  on(actions.DeleteStratSuccess, (state, { stratId }) => {
    return adapter.removeOne(stratId, {
      ...state,
      strat: null,
      action: StratAction.DELETE,
      error: null,
    });
  }),
  on(actions.DeleteStratError, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(actions.LoadStrat, (state, {}) => ({
    ...state,
    error: null,
  })),
  on(actions.LoadStratSuccess, (state, { strat }) => ({
    ...state,
    strat: strat,
    action: StratAction.LOAD,
    error: null,
  })),
  on(actions.LoadStratError, (state, { error }) => ({
    ...state,
    error: error,
    strat: null,
  })),
  on(actions.CreateStrat, (state, { strat }) => ({
    ...state,
    error: null,
    action: StratAction.CREATE,
    strat: strat,
  })),
  on(actions.SetCurrentLayer, (state, { layer }) => ({
    ...state,
    layer: layer,
    action: null,
  })),
  /// Strat modifications
  on(actions.UpdateStratLayer, (state, { canvas, floorId, floorName }) => {
    return {
      ...state,
      strat: {
        ...state.strat,
        layers: mergeLayers(state.strat.layers, canvas, floorId, floorName),
      },
      action: StratAction.UPDATE_LAYER,
      error: null,
    };
  }),
  on(actions.UpdateStratInfos, (state, { name, description, isPublic }) => ({
    ...state,
    strat: {
      ...state.strat,
      name: name,
      description: description,
      isPublic: isPublic,
    },
    action: StratAction.UPDATE_INFOS,
  })),
  on(actions.ClearStratState, (state) => ({
    ...state,
    error: null,
    strat: null,
    action: null,
    layer: null,
  }))
);

function mergeLayers(
  layers: Layer[],
  canvasState: string,
  floorId: string,
  floorName: string
): Layer[] {
  const layersCopy: Layer[] = [];
  if (layers.length > 0) {
    layers.forEach((layer) => {
      const layerCopy: Layer = Object.assign({}, layer);
      if (layerCopy.floorId === floorId) {
        layerCopy.canvasState = canvasState;
      }
      layersCopy.push(layerCopy);
    });
  } else {
    layersCopy.push({
      canvasState,
      floorId,
      floorName,
    } as Layer);
  }
  return layersCopy;
}

export function reducer(state: StratState | undefined, action: Action) {
  return stratReducer(state, action);
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = adapter.getSelectors();
