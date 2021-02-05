import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as actions from '../actions/strat.action';
import { StratService } from '@strat-editor/services';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class StratEffect {
  constructor(private actions$: Actions, private stratService: StratService) {}

  getStrats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.GetMyStrats),
      mergeMap((action) =>
        this.stratService.getAllStrats(action.userId).pipe(
          map((strats) => actions.GetMyStratsSuccess({ strats })),
          catchError((error: HttpErrorResponse) =>
            of(actions.GetMyStratsError({ error }))
          )
        )
      )
    )
  );

  uploadStrat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.SaveStrat),
      mergeMap((action) =>
        this.stratService.saveStrat(action.strat).pipe(
          map((strat) => actions.SaveStratSuccess({ strat })),
          catchError((error: HttpErrorResponse) =>
            of(actions.SaveStratError({ error }))
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
          map((strat) => actions.SaveStratSuccess({ strat })),
          catchError((error: HttpErrorResponse) =>
            of(actions.SaveStratError({ error }))
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
