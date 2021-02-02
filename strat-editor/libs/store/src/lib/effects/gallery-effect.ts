import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as actions from '../actions/gallery.action';
import { HttpErrorResponse } from '@angular/common/http';
import { GalleryService } from '@strat-editor/services';

@Injectable()
export class GalleryEffect {
  constructor(
    private actions$: Actions,
    private galleryService: GalleryService
  ) {}

  getImages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.GetGalleryImages),
      mergeMap(() =>
        this.galleryService.getImages().pipe(
          map((images) => actions.GetGalleryImagesSuccess({ images })),
          catchError((error: HttpErrorResponse) =>
            of(actions.GetGalleryImagesError({ error }))
          )
        )
      )
    )
  );

  uploadImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.UploadGalleryImage),
      mergeMap((action) =>
        this.galleryService.uploadImage(action.image).pipe(
          map((image) => actions.UploadGalleryImageSuccess({ image })),
          catchError((error: HttpErrorResponse) =>
            of(actions.UploadGalleryImageError({ error }))
          )
        )
      )
    )
  );
}
