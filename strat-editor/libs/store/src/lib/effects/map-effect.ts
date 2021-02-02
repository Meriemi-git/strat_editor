import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as actions from '../actions/map.action';
import { MapService } from '@strat-editor/services';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class MapEffect {
  constructor(private actions$: Actions, private mapService: MapService) {}

  fechmaps$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.FetchMaps.type),
      mergeMap(() =>
        this.mapService.getAllMaps().pipe(
          map((maps) => actions.FetchMapsSuccess({ maps: maps })),
          catchError((err: HttpErrorResponse) =>
            of(actions.FetchMapsError({ error: err.message }))
          )
        )
      )
    )
  );
}
