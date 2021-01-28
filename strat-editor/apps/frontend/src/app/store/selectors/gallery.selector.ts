import { createSelector, createFeatureSelector } from '@ngrx/store';
import { GalleryState } from '../states/gallery.state';

const galleryFeature = createFeatureSelector<GalleryState>('GalleryState');
export const selectGalleryState = createSelector(
  galleryFeature,
  (state: GalleryState) => state
);
export const getGalleryImages = createSelector(
  selectGalleryState,
  (state: GalleryState) => state.images
);

export const getGalleryError = createSelector(
  selectGalleryState,
  (state: GalleryState) => state.error
);

export const getDraggedImage = createSelector(
  selectGalleryState,
  (state: GalleryState) => state.draggedImage
);
