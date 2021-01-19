import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import * as actions from '../actions/auth.action';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthentService } from '../../services/authent.service';

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
            console.log('In effect error');
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

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.Register),
      mergeMap((action) =>
        this.authService.register(action.userDto).pipe(
          map((userInfos) => {
            return actions.RegisterSuccess({ userInfos });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(actions.RegisterError({ error: err }));
          })
        )
      )
    )
  );

  sendConfirmationEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.SendConfirmationEmail),
      mergeMap((action) =>
        this.authService.sendConfirmationEmail(action.userInfos).pipe(
          map(() => {
            return actions.SendConfirmationEmailSuccess();
          }),
          catchError((error: HttpErrorResponse) => {
            return of(actions.SendConfirmationEmailError({ error }));
          })
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
}
