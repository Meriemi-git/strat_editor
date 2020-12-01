import {Agent} from "@strat-editor/data"
import * as actions from '../actions/agent.action';
import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity"

export interface AgentState extends EntityState<Agent>{
  loading: boolean;
  error: string;
}

export const adapter : EntityAdapter<Agent> =
   createEntityAdapter<Agent>({
    sortComparer: sortByName,
    selectId: (agent: Agent) => agent._id
  });

export function sortByName(a: Agent, b: Agent): number {
  return a.name.localeCompare(b.name);
}

export const initialstate: AgentState = adapter.getInitialState({
  ids : [],
  error : null,
  loading : false
});

const agentReducer = createReducer(
  initialstate,
  on(actions.FetchAgents, state => ({
    ...state,
    loading: true
  })),
  on(actions.FetchAgentsSuccess, (state, { agents }) => {
    const truc = adapter.addMany(agents, { ...state, loading:false,error:null });
   return truc;
  }),
  on(actions.FetchAgentsError, (state, { error }) => ({
    ...state,
    loading : false,
    isLoaded : false,
    error: error
  })),
)

export function reducer(state: AgentState | undefined, action: Action) {
  return agentReducer(state, action);
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal

} = adapter.getSelectors();

export const selectAllAgents = selectAll;

