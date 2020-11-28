import {Agent} from "@strat-editor/models"
import * as actions from '../actions/agent.action';
import { createReducer, on, Action } from '@ngrx/store';


export interface AgentState{
  data: Agent[];
  loading: boolean;
  error: string;
  isLoaded: boolean;
}

export const initialstate: AgentState = {
  data: [],
  loading: false,
  error: "",
  isLoaded : false
}

const agentReducer = createReducer(
  initialstate,
  on(actions.FetchAgents, state => ({
    ...state,
    loading: true,
    isLoaded : false,
  })),
  on(actions.FetchAgentsSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    isLoaded : true,
    data: payload
  })),
  on(actions.FetchAgentsError, (state, { payload }) => ({
    ...state,
    loading : false,
    isLoaded : false,
    error: payload
  })),
)

export function reducer(state: AgentState | undefined, action: Action) {
  return agentReducer(state, action);
}
