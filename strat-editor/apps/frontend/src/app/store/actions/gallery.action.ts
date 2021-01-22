import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Image } from '@strat-editor/data';

export const GetGalleryImages = createAction('[Gallery] Get Gallery Image');

export const GetGalleryImagesSuccess = createAction(
  '[Gallery] Get Gallery Image Success',
  props<{ images: Image[] }>()
);

export const GetGalleryImagesError = createAction(
  '[Gallery] Get Gallery Image Error',
  props<{ error: HttpErrorResponse }>()
);

export const UploadGalleryImage = createAction(
  '[Gallery] Upload Gallery Image',
  props<{ image: File }>()
);

export const UploadGalleryImageSuccess = createAction(
  '[Gallery] Upload Gallery Image Success'
);

export const UploadGalleryImageError = createAction(
  '[Gallery] Upload Gallery Image Error',
  props<{ error: HttpErrorResponse }>()
);
