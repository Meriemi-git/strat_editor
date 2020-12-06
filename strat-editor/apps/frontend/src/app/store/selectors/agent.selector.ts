import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as Agent from '../reducers/agent.reducer';


const agentFeature = createFeatureSelector<Agent.AgentState>('AgentState');
export const selectAgentState = createSelector(agentFeature,(state: Agent.AgentState) => state);
export const selectAgentsLoading = createSelector(selectAgentState,(state: Agent.AgentState) => state.loaded);
export const selectAllAgents = createSelector(agentFeature, Agent.selectAll);
export const selectAgentByName = createSelector(selectAllAgents,(agents,name) => agents.filter(x => x.name === name))





