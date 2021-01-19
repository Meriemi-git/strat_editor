import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as actions from '../actions/user.action';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user.service';

@Injectable()
export class UserEffect {
  constructor(private actions$: Actions, private userService: UserService) {}

  getUserInfos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.GetUserInfos),
      mergeMap((action) =>
        this.userService.getUserInfos(action.userId).pipe(
          map((userInfos) => actions.GetUserInfosSuccess({ userInfos })),
          catchError((error: HttpErrorResponse) =>
            of(actions.GetUserInfosError({ error }))
          )
        )
      )
    )
  );

  changePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.ChangePassword),
      mergeMap((action) =>
        this.userService.changePassword(action.passwords).pipe(
          map(() => actions.ChangePasswordSuccess()),
          catchError((error: HttpErrorResponse) =>
            of(actions.ChangePasswordError({ error }))
          )
        )
      )
    )
  );

  changeMail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.ChangeMail),
      mergeMap((action) =>
        this.userService.changeMail(action.newMail).pipe(
          map((userInfos) => actions.ChangeMailSuccess({ userInfos })),
          catchError((error: HttpErrorResponse) =>
            of(actions.ChangeMailError({ error }))
          )
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.Register),
      mergeMap((action) =>
        this.userService.register(action.userDto).pipe(
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
        this.userService.sendConfirmationEmail(action.userInfos).pipe(
          map((userInfos) => {
            return actions.SendConfirmationEmailSuccess({ userInfos });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(actions.SendConfirmationEmailError({ error }));
          })
        )
      )
    )
  );
}
