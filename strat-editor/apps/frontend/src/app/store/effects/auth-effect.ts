import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as actions from '../actions/auth.action';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user.service';

@Injectable()
export class AuthEffect {
  constructor(private actions$: Actions, private userService: UserService) {}

  logIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.LogIn),
      mergeMap((action) =>
        this.userService.login(action.userDto).pipe(
          map((authInfos) => actions.LogInSuccess({ authInfos })),
          catchError((err: HttpErrorResponse) =>
            of(actions.LogInError({ error: err }))
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
          map(() => actions.RegisterSuccess()),
          catchError((err: HttpErrorResponse) =>
            of(actions.RegisterError({ error: err }))
          )
        )
      )
    )
  );
}
