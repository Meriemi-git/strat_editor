import * as agentReducer from './agent.reducer';
import * as sidenavReducer from './sidenav.reducer';
import * as mapReducer from './map.reducer';
import * as drawerReducer from './drawer.reducer';
import * as canvasReducer from './canvas.reducer';
import * as authReducer from './auth.reducer';

import { ActionReducerMap } from '@ngrx/store';

export interface StratEditorState {
  AgentState: agentReducer.AgentState;
  SidenavState: sidenavReducer.SidenavState;
  MapState: mapReducer.MapState;
  DrawerState: drawerReducer.DrawingActionState;
  CanvasState: canvasReducer.CanvasState;
  AuthState: authReducer.AuthState;
}

export const reducers: ActionReducerMap<StratEditorState> = {
  AgentState: agentReducer.reducer,
  SidenavState: sidenavReducer.reducer,
  MapState: mapReducer.reducer,
  DrawerState: drawerReducer.reducer,
  CanvasState: canvasReducer.reducer,
  AuthState: authReducer.reducer,
};
