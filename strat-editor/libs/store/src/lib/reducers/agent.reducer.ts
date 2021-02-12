import { Agent } from '@strat-editor/data';
import * as actions from '../actions/agent.action';
import { createReducer, on, Action } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AgentState } from '../states/agent.state';

export const adapter: EntityAdapter<Agent> = createEntityAdapter<Agent>({
  sortComparer: sortByName,
  selectId: (agent: Agent) => agent._id,
});

export function sortByName(a: Agent, b: Agent): number {
  return a.name.localeCompare(b.name);
}

export const initialstate: AgentState = adapter.getInitialState({
  error: null,
  loaded: false,
  dragged: null,
});

const agentReducer = createReducer(
  initialstate,
  on(actions.FetchAgents, (state) => ({
    ...state,
  })),
  on(actions.FetchAgentsSuccess, (state, { agents }) => {
    return adapter.addMany(agents, { ...state, loading: false, error: null });
  }),
  on(actions.FetchAgentsError, (state, { error }) => ({
    ...state,
    loaded: false,
    error: error,
  })),
  on(actions.DragAgent, (state, { agent }) => ({
    ...state,
    dragged: agent,
  })),
  on(actions.DragAgentSuccess, (state) => ({
    ...state,
    dragged: null,
  }))
);

export function reducer(state: AgentState | undefined, action: Action) {
  return agentReducer(state, action);
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = adapter.getSelectors();

export const selectAllAgents = selectAll;
