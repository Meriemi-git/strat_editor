import { Layer, Strat } from '@strat-editor/data';
import * as actions from '../actions/strat.action';
import { createReducer, on, Action } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { StratState } from '../states/strat.state';
import { ToastrComponentlessModule } from 'ngx-toastr';

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
  loadedStrat: null,
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
  on(actions.LoadStratSuccess, (state, { strat }) => ({
    ...state,
    error: null,
    loadedStrat: strat,
    currentStrat: strat,
  })),
  on(actions.LoadStrat, (state, { stratId }) => ({
    ...state,
    error: null,
    loadedStrat: null,
  })),
  on(actions.CreateStrat, (state, { strat }) => ({
    ...state,
    error: null,
    currentStrat: strat,
    loadedStrat: null,
  })),
  /// Strat modifications
  on(actions.UpdateStratLayer, (state, { canvas, floorId, floorName }) => {
    return {
      ...state,
      currentStrat: {
        ...state.currentStrat,
        layers: mergeLayers(
          state.currentStrat.layers,
          canvas,
          floorId,
          floorName
        ),
      },
      error: null,
    };
  }),
  on(actions.UpdateStratInfos, (state, { name, description, isPublic }) => ({
    ...state,
    currentStrat: {
      ...state.currentStrat,
      name: name,
      description: description,
      isPublic: isPublic,
    },
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
