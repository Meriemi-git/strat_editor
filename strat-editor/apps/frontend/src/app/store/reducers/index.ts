import * as agentReducer from './agent.reducer';
import * as sidenavReducer from './sidenav.reducer';
import * as mapReducer from './map.reducer';
import * as drawingActionReducer from './drawer.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface StratEditorState {
  AgentState: agentReducer.AgentState;
  SidenavState: sidenavReducer.SidenavState;
  MapState: mapReducer.MapState;
  DrawerState: drawingActionReducer.DrawingActionState;
}

export const reducers: ActionReducerMap<StratEditorState> = {
  AgentState: agentReducer.reducer,
  SidenavState: sidenavReducer.reducer,
  MapState: mapReducer.reducer,
  DrawerState: drawingActionReducer.reducer,
};
