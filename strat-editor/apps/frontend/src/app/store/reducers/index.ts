import * as agentReducer from './agent.reducer';
import * as sidenavReducer from './sidenav.reducer';
import * as mapReducer from './map.reducer';
import * as drawerReducer from './drawer.reducer';
import * as canvasReducer from './canvas.reducer';
import * as userReducer from './user.reducer';
import * as galleryReducer from './gallery.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface StratEditorState {
  AgentState: agentReducer.AgentState;
  CanvasState: canvasReducer.CanvasState;
  DrawerState: drawerReducer.DrawingActionState;
  GalleryState: galleryReducer.GalleryState;
  MapState: mapReducer.MapState;
  SidenavState: sidenavReducer.SidenavState;
  UserState: userReducer.UserState;
}

export const reducers: ActionReducerMap<StratEditorState> = {
  AgentState: agentReducer.reducer,
  CanvasState: canvasReducer.reducer,
  DrawerState: drawerReducer.reducer,
  GalleryState: galleryReducer.reducer,
  MapState: mapReducer.reducer,
  SidenavState: sidenavReducer.reducer,
  UserState: userReducer.reducer,
};
