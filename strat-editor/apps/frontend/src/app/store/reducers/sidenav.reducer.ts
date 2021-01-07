import * as actions from '../actions/sidenav.action';
import { createReducer, on, Action } from '@ngrx/store';

export interface SidenavState {
  rightIsOpen: boolean;
  leftIsOpen: boolean;
  agentsPanelIsOpen: boolean;
  gadgetsPanelIsOpen: boolean;
  drawingPanelIsOpen: boolean;
  galleryPanelIsOpen: boolean;
  mainMenuPanelIsOpen: boolean;
  accountPanelIsOpen: boolean;
}

export const initialstate: SidenavState = {
  rightIsOpen: false,
  leftIsOpen: false,
  agentsPanelIsOpen: false,
  gadgetsPanelIsOpen: false,
  drawingPanelIsOpen: false,
  galleryPanelIsOpen: false,
  mainMenuPanelIsOpen: false,
  accountPanelIsOpen: false,
};

const sidenavReducer = createReducer(
  initialstate,
  on(actions.toggleLeft, (state) => ({
    ...state,
    leftIsOpen: !state.leftIsOpen,
  })),
  on(actions.toggleRight, (state) => ({
    ...state,
    rightIsOpen: !state.rightIsOpen,
  })),
  on(actions.closeRight, (state) => ({
    ...state,
    rightIsOpen: false,
    agentsPanelIsOpen: false,
    gadgetsPanelIsOpen: false,
    drawingPanelIsOpen: false,
    galleryPanelIsOpen: false,
    mainMenuPanelIsOpen: false,
    accountPanelIsOpen: false,
  })),
  on(actions.closeLeft, (state) => ({
    ...state,
    leftIsOpen: false,
    agentsPanelIsOpen: false,
    gadgetsPanelIsOpen: false,
    drawingPanelIsOpen: false,
    galleryPanelIsOpen: false,
    mainMenuPanelIsOpen: false,
    accountPanelIsOpen: false,
  })),
  on(actions.showAgentsPanel, (state) => ({
    ...state,
    leftIsOpen: true,
    rightIsOpen: false,
    agentsPanelIsOpen: true,
    gadgetsPanelIsOpen: false,
    drawingPanelIsOpen: false,
    galleryPanelIsOpen: false,
    mainMenuPanelIsOpen: false,
    accountPanelIsOpen: false,
  })),

  on(actions.showGadgetsPanel, (state) => ({
    ...state,
    leftIsOpen: true,
    rightIsOpen: false,
    agentsPanelIsOpen: false,
    gadgetsPanelIsOpen: true,
    drawingPanelIsOpen: false,
    galleryPanelIsOpen: false,
    mainMenuPanelIsOpen: false,
    accountPanelIsOpen: false,
  })),
  on(actions.showDrawingPanel, (state) => ({
    ...state,
    leftIsOpen: false,
    rightIsOpen: true,
    agentsPanelIsOpen: false,
    gadgetsPanelIsOpen: false,
    drawingPanelIsOpen: true,
    galleryPanelIsOpen: false,
    mainMenuPanelIsOpen: false,
    accountPanelIsOpen: false,
  })),
  on(actions.showGalleryPanel, (state) => ({
    ...state,
    leftIsOpen: false,
    rightIsOpen: true,
    agentsPanelIsOpen: false,
    gadgetsPanelIsOpen: false,
    drawingPanelIsOpen: false,
    galleryPanelIsOpen: true,
    mainMenuPanelIsOpen: false,
    accountPanelIsOpen: false,
  })),
  on(actions.showMainMenuPanel, (state) => ({
    ...state,
    leftIsOpen: true,
    rightIsOpen: false,
    agentsPanelIsOpen: false,
    gadgetsPanelIsOpen: false,
    drawingPanelIsOpen: false,
    galleryPanelIsOpen: false,
    mainMenuPanelIsOpen: true,
    accountPanelIsOpen: false,
  })),
  on(actions.showAccountPanel, (state) => ({
    ...state,
    leftIsOpen: false,
    rightIsOpen: true,
    agentsPanelIsOpen: false,
    gadgetsPanelIsOpen: false,
    drawingPanelIsOpen: false,
    galleryPanelIsOpen: false,
    mainMenuPanelIsOpen: false,
    accountPanelIsOpen: true,
  }))
);

export function reducer(state: SidenavState | undefined, action: Action) {
  return sidenavReducer(state, action);
}
