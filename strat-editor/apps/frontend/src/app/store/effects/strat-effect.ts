import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as actions from '../actions/strat.action';
import { StratService } from '../../services/strat.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class StratEffect {
  constructor(private actions$: Actions, private stratService: StratService) {}

  getStrats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.GetStrats),
      mergeMap((action) =>
        this.stratService.getAllStrats(action.userId).pipe(
          map((strats) => actions.GetStratsSuccess({ strats })),
          catchError((error: HttpErrorResponse) =>
            of(actions.GetStratsError({ error }))
          )
        )
      )
    )
  );

  uploadStrat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.UploadStrat),
      mergeMap((action) =>
        this.stratService.uploadStrat(action.strat).pipe(
          map((strat) => actions.UploadStratSuccess({ strat })),
          catchError((error: HttpErrorResponse) =>
            of(actions.UploadStratError({ error }))
          )
        )
      )
    )
  );

  updateStrat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.UpdateStrat),
      mergeMap((action) =>
        this.stratService.updateStrat(action.strat).pipe(
          map((strat) => actions.UploadStratSuccess({ strat })),
          catchError((error: HttpErrorResponse) =>
            of(actions.UploadStratError({ error }))
          )
        )
      )
    )
  );

  deleteStrat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.DeleteStrat),
      mergeMap((action) =>
        this.stratService.deleteStrat(action.stratId).pipe(
          map(() => actions.DeleteStratSuccess()),
          catchError((error: HttpErrorResponse) =>
            of(actions.DeleteStratError({ error }))
          )
        )
      )
    )
  );
}
