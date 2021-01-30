import * as agentReducer from './agent.reducer';
import * as sidenavReducer from './sidenav.reducer';
import * as mapReducer from './map.reducer';
import * as drawerReducer from './drawer.reducer';
import * as canvasReducer from './canvas.reducer';
import * as userReducer from './user.reducer';
import * as galleryReducer from './gallery.reducer';
import * as stratReducer from './strat.reducer';

import { ActionReducerMap } from '@ngrx/store';
import { AgentState } from '../states/agent.state';
import { DrawerState } from '../states/drawer.state';
import { GalleryState } from '../states/gallery.state';
import { MapState } from '../states/map.state';
import { SidenavState } from '../states/sidenav.state';
import { UserState } from '../states/user.state';
import { CanvasState } from '../states/canvas.state';
import { StratState } from '../states/strat.state';

export interface StratEditorState {
  AgentState: AgentState;
  CanvasState: CanvasState;
  DrawerState: DrawerState;
  GalleryState: GalleryState;
  MapState: MapState;
  SidenavState: SidenavState;
  UserState: UserState;
  StratState: StratState;
}

export const reducers: ActionReducerMap<StratEditorState> = {
  AgentState: agentReducer.reducer,
  CanvasState: canvasReducer.reducer,
  DrawerState: drawerReducer.reducer,
  GalleryState: galleryReducer.reducer,
  MapState: mapReducer.reducer,
  SidenavState: sidenavReducer.reducer,
  UserState: userReducer.reducer,
  StratState: stratReducer.reducer,
};
