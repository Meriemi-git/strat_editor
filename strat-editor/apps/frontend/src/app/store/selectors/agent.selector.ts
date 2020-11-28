import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AgentState } from '../reducers/agent.reducer';

const agentFeature = createFeatureSelector<AgentState>('AgentState');
export const selectAgentState = createSelector(agentFeature,(state: AgentState) => state);
export const selectAgentsLoading = createSelector(selectAgentState,(state: AgentState) => state.loading);
export const selectAgents = createSelector(selectAgentState,(state: AgentState) => state.data);
export const selectAgentByName = createSelector(selectAgentState, (state: AgentState, name: string) => state.data.find(agent => agent.name === name));


