import * as actions from '../actions/gallery.action';
import { createReducer, on, Action } from '@ngrx/store';
import { GalleryState } from '../states/gallery.state';

export const initialstate: GalleryState = {
  images: [],
  draggedImage: null,
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
  on(actions.UploadGalleryImageSuccess, (state, { image }) => ({
    ...state,
    images: [image, ...state.images],
    error: null,
  })),
  on(actions.UploadGalleryImageError, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(actions.DragImage, (state, { image }) => ({
    ...state,
    draggedImage: image,
  })),
  on(actions.DragImageSuccess, (state) => ({
    ...state,
    draggedImage: null,
  }))
);

export function reducer(state: GalleryState | undefined, action: Action) {
  return sidenavReducer(state, action);
}
