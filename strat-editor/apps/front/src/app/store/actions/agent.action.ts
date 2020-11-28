import { createAction, props } from '@ngrx/store';
import { Agent } from '@strat-editor/models';

export const FetchAgents = createAction(
  '[Agent] Fetch Agents'
);

export const FetchAgentsSuccess = createAction(
  '[Agent] Fetch Agents Success',
  props<{ payload: Agent[] }>()
);

export const FetchAgentsError = createAction(
  '[Agent] Fetch Agents Error',
  props<{ payload: string }>()
);

