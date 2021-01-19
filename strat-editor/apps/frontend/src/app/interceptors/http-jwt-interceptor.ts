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
import { AuthentService } from '../services/authent.service';
import { StratEditorState } from '../store/reducers';
import * as Actions from '../store/actions';

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
        if (
          !request.url.endsWith('disconnect') &&
          !request.url.endsWith('login') &&
          !request.url.endsWith('register') &&
          !request.url.endsWith('refresh')
        ) {
          console.log('HttpJwtInterceptor request url', request.url);
          if (error instanceof HttpErrorResponse) {
            switch (error.status) {
              case 401:
                return this.handle401Error(request, next);
              case 403:
                console.log('disconnection');
                this.store.dispatch(Actions.Disconnect());
                break;
            }
          }
          console.log('yolo1');
          throw error;
        } else {
          console.log('yolo2');
          throw error;
        }
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          console.log('isRefreshing false : ', token);
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token);
          return next.handle(request.clone());
        }),
        catchError((err: HttpErrorResponse) => {
          console.log('isRefreshing false error', err);
          return throwError(err);
        })
      );
    } else {
      console.log('piping the request');
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
