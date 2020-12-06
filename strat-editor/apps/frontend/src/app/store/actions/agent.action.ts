import { createAction, props, union } from '@ngrx/store';
import { Agent } from '@strat-editor/data';

export const FetchAgents = createAction(
  '[Agent] Fetch Agents'
);

export const FetchAgentsSuccess = createAction(
  '[Agent] Fetch Agents Success',
  props<{ agents: Agent[] }>()
);

export const FetchAgentsError = createAction(
  '[Agent] Fetch Agents Error',
  props<{ error: string }>()
);

export const actions = union({
  FetchAgents,
  FetchAgentsSuccess,
  FetchAgentsError
});


export type AgentActions = typeof actions;

