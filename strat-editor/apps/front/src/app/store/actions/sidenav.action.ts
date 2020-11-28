import { createAction } from '@ngrx/store';

export const toggleLeft = createAction(
  '[Sidenav] Toggle Left Sidenav'
);

export const toggleRight = createAction(
  '[Sidenav] Toggle Right Sidenav'
);
