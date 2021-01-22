import * as actions from '../actions/gallery.action';
import { createReducer, on, Action } from '@ngrx/store';
import { Image } from '@strat-editor/data';
import { HttpErrorResponse } from '@angular/common/http';

export interface GalleryState {
  images: Image[];
  error: HttpErrorResponse;
}

export const initialstate: GalleryState = {
  images: [],
  error: null,
};

const sidenavReducer = createReducer(
  initialstate,
  on(actions.GetGalleryImages, (state) => ({
    ...state,
    error: null,
  })),
  on(actions.GetGalleryImagesSuccess, (state, { images }) => ({
    ...state,
    images: images,
    error: null,
  })),
  on(actions.GetGalleryImagesError, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(actions.UploadGalleryImage, (state) => ({
    ...state,
    error: null,
  })),
  on(actions.UploadGalleryImageSuccess, (state) => ({
    ...state,
    error: null,
  })),
  on(actions.UploadGalleryImageError, (state, { error }) => ({
    ...state,
    error: error,
  }))
);

export function reducer(state: GalleryState | undefined, action: Action) {
  return sidenavReducer(state, action);
}
