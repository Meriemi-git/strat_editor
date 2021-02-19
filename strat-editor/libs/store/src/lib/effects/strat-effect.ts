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
      ofType(actions.GetStratPage),
      mergeMap((action) =>
        this.stratService.getAllStratsPaginated(action.pageOptions).pipe(
          map((pageResults) => actions.GetStratPageSuccess({ pageResults })),
          catchError((error: HttpErrorResponse) =>
            of(actions.GetStratPageError({ error }))
          )
        )
      )
    )
  );

  getStratsById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.LoadStrat),
      mergeMap((action) =>
        this.stratService.loadStratById(action.stratId).pipe(
          map((strat) => actions.LoadStratSuccess({ strat })),
          catchError((error: HttpErrorResponse) =>
            of(actions.LoadStratError({ error }))
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
          map((strat) => actions.UpdateStratSuccess({ strat })),
          catchError((error: HttpErrorResponse) =>
            of(actions.UpdateStratError({ error }))
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
          map((stratId) => actions.DeleteStratSuccess({ stratId })),
          catchError((error: HttpErrorResponse) =>
            of(actions.DeleteStratError({ error }))
          )
        )
      )
    )
  );
}
