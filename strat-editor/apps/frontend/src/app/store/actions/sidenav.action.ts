import { createAction, union } from '@ngrx/store';

export const toggleLeft = createAction(
  '[Sidenav] Toggle Left Sidenav'
);

export const toggleRight = createAction(
  '[Sidenav] Toggle Right Sidenav'
);

const actions = union({
  toggleLeft,
  toggleRight
});


export type SidenavActions = typeof actions;
