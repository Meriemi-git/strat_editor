import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthentService } from '@strat-editor/services';
import { StratEditorState } from '@strat-editor/store';
import * as Actions from '@strat-editor/store';
import { UserInfos } from '@strat-editor/data';

@Injectable()
export class HttpJwtInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  constructor(
    private authService: AuthentService,
    private store: Store<StratEditorState>
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        console.log('HttpJwtInterceptor request url', request.url);
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 401:
              if (
                !request.url.endsWith('disconnect') &&
                !request.url.endsWith('login') &&
                !request.url.endsWith('register') &&
                !request.url.endsWith('refresh')
              ) {
                return this.handle401Error(request, next);
              } else {
                throw error;
              }
            case 403:
              this.store.dispatch(Actions.Disconnect());
              break;
          }
        }
        throw error;
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.authService.refreshToken().pipe(
        switchMap((userInfos: UserInfos) => {
          this.store.dispatch(Actions.RefreshTokensSuccess({ userInfos }));
          this.isRefreshing = false;
          this.refreshTokenSubject.next(userInfos);
          return next.handle(request.clone());
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap(() => {
          return next.handle(request.clone());
        }),
        catchError((error) => {
          this.refreshTokenSubject.unsubscribe();
          this.refreshTokenSubject = new BehaviorSubject<any>(null);
          this.isRefreshing = false;
          throw throwError(error);
        })
      );
    }
  }
}
