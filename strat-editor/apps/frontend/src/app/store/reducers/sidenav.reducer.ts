import * as actions from '../actions/sidenav.action';
import { createReducer, on, Action } from '@ngrx/store';


export interface SidenavState{
  rightIsOpen : boolean;
  leftIsOpen : boolean;
}

export const initialstate: SidenavState = {
  rightIsOpen: false,
  leftIsOpen : false
}


const sidenavReducer = createReducer(
  initialstate,
  on(actions.toggleLeft, state => ({
    ...state,
    leftIsOpen : !state.leftIsOpen,
  })),
  on(actions.toggleRight, state => ({
    ...state,
    rightIsOpen: !state.rightIsOpen,
  }))
)

export function reducer(state: SidenavState | undefined, action: Action) {
  return  sidenavReducer(state, action);
}
