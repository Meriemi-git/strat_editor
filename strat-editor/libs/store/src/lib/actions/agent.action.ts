import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Agent } from '@strat-editor/data';

export const FetchAgents = createAction('[Agent] Fetch Agents');

export const FetchAgentsSuccess = createAction(
  '[Agent] Fetch Agents Success',
  props<{ agents: Agent[] }>()
);

export const FetchAgentsError = createAction(
  '[Agent] Fetch Agents Error',
  props<{ error: HttpErrorResponse }>()
);

export const DragAgent = createAction(
  '[Agent] Drag Agent',
  props<{ agent: Agent }>()
);

export const DragAgentSuccess = createAction('[Agent] Drag Agent success');
