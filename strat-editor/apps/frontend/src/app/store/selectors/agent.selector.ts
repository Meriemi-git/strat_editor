import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as a from '../reducers/agent.reducer';


const agentFeature = createFeatureSelector<a.AgentState>('AgentState');
export const selectAgentState = createSelector(agentFeature,(state: a.AgentState) => state);
export const selectAgentsLoading = createSelector(selectAgentState,(state: a.AgentState) => state.loading);
export const selectAll = createSelector(agentFeature, a.selectAll);
// export const selectAgents = createSelector(selectAgentState,(state: AgentState) => state.data);
// export const selectAgentByName = createSelector(selectAgentState, (state: AgentState, name: string) => state.data.find(agent => agent.name === name));


