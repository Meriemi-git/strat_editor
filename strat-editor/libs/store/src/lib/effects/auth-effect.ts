import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as actions from '../actions/auth.action';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthentService } from '@strat-editor/services';

@Injectable()
export class AuthEffect {
  constructor(private actions$: Actions, private authService: AuthentService) {}

  logIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.LogIn),
      mergeMap((action) =>
        this.authService.login(action.userDto).pipe(
          map((userInfos) => actions.LogInSuccess({ userInfos })),
          catchError((err) => {
            return of(actions.LogInError({ error: err }));
          })
        )
      )
    )
  );

  refreshTokens$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.RefreshTokens),
      mergeMap(() =>
        this.authService.refreshToken().pipe(
          map((userInfos) => actions.RefreshTokensSuccess({ userInfos })),
          catchError((err: HttpErrorResponse) =>
            of(actions.RefreshTokensError({ error: err }))
          )
        )
      )
    )
  );

  disconnect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.Disconnect),
      mergeMap(() =>
        this.authService.disconnect().pipe(
          map(() => actions.DisconnectSuccess()),
          catchError((error: HttpErrorResponse) =>
            of(actions.DisconnectError({ error }))
          )
        )
      )
    )
  );

  confirmEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.ConfirmEmail),
      mergeMap((action) =>
        this.authService.confirmEmail(action.token).pipe(
          map(() => actions.ConfirmEmailSuccess()),
          catchError((error: HttpErrorResponse) =>
            of(actions.ConfirmEmailError({ error }))
          )
        )
      )
    )
  );
}
