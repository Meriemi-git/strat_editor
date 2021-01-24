import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as Gallery from '../reducers/gallery.reducer';

const galleryFeature = createFeatureSelector<Gallery.GalleryState>(
  'GalleryState'
);
export const selectGalleryState = createSelector(
  galleryFeature,
  (state: Gallery.GalleryState) => state
);
export const getGalleryImages = createSelector(
  selectGalleryState,
  (state: Gallery.GalleryState) => state.images
);

export const getGalleryError = createSelector(
  selectGalleryState,
  (state: Gallery.GalleryState) => state.error
);

export const getDraggedImage = createSelector(
  selectGalleryState,
  (state: Gallery.GalleryState) => state.draggedImage
);
