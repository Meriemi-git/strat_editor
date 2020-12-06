import * as agentReducer from './agent.reducer';
import * as sidenavReducer from './sidenav.reducer';
import * as mapReducer from './map.reducer';
import * as drawingActionReducer from './drawing-action.reducer';
import { ActionReducerMap } from '@ngrx/store';



export interface StratEditorState {
  AgentState: agentReducer.AgentState,
  SidenavState: sidenavReducer.SidenavState,
  MapState : mapReducer.MapState,
  DrawingActionState : drawingActionReducer.DrawingActionState

}

export const reducers: ActionReducerMap<StratEditorState> = {
  AgentState: agentReducer.reducer,
  SidenavState: sidenavReducer.reducer,
  MapState: mapReducer.reducer,
  DrawingActionState : drawingActionReducer.reducer
};
