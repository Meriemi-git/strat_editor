import { createAction, union } from '@ngrx/store';

export const toggleLeft = createAction('[Sidenav] Toggle Left Sidenav');
export const closeLeft = createAction('[Sidenav] Close Left Sidenav');
export const toggleRight = createAction('[Sidenav] Toggle Right Sidenav');
export const closeRight = createAction('[Sidenav] Close Right Sidenav');

const actions = union({
  toggleLeft,
  closeLeft,
  toggleRight,
  closeRight,
});

export type SidenavActions = typeof actions;
