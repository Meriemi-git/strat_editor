import { createSelector, createFeatureSelector } from '@ngrx/store';
import { selectAll } from '../reducers/agent.reducer';
import { AgentState } from '../states/agent.state';

const agentFeature = createFeatureSelector<AgentState>('AgentState');
export const selectAgentState = createSelector(
  agentFeature,
  (state: AgentState) => state
);
export const selectAgentsLoading = createSelector(
  selectAgentState,
  (state: AgentState) => state.loaded
);
export const selectAllAgents = createSelector(agentFeature, selectAll);

export const selectAgentByName = createSelector(
  selectAllAgents,
  (agents, name) => agents.filter((x) => x.name === name)
);
export const getDraggedAgent = createSelector(
  selectAgentState,
  (state: AgentState) => state.dragged
);
