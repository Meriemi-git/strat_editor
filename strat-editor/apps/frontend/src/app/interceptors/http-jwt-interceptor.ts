import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
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
          !request.url.endsWith('register')
        ) {
          console.log('HttpJwtInterceptor request url', request.url);
          if (error instanceof HttpErrorResponse && error.status === 401) {
            return this.handle401Error(request, next);
          } else {
            this.store.dispatch(Actions.Disconnect());
            return of(error);
          }
        } else {
          throw error;
        }
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    console.log('handle401Error');
    if (!this.isRefreshing) {
      console.log('isRefreshing true');
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
          console.log('err :', err);
          return of(err);
        })
      );
    } else {
      console.log('piping the request');
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap(() => {
          return next.handle(request.clone());
        })
      );
    }
  }
}
