import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationType, Strat } from '@strat-editor/data';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { NotificationService } from './notifications.service';

@Injectable({
  providedIn: 'root',
})
export class StratService {
  private controller = 'strat';
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  public getAllStrats(): Observable<Strat[]> {
    return this.http
      .get<Strat[]>(environment.apiUrl + this.controller + '/all')
      .pipe(
        catchError((err) => {
          this.notificationService.displayNotification({
            message: 'Cannot retreive strats',
            type: NotificationType.error,
          });
          return throwError(err);
        })
      );
  }

  public saveStrat(strat: Strat): Observable<Strat> {
    return this.http
      .post<Strat>(environment.apiUrl + this.controller, strat)
      .pipe(
        map((strat) => {
          this.notificationService.displayNotification({
            message: 'Strat saved !',
            type: NotificationType.success,
          });
          return strat;
        }),
        catchError((err) => {
          this.notificationService.displayNotification({
            message: 'Cannot save your strat',
            type: NotificationType.error,
          });
          return throwError(err);
        })
      );
  }

  public deleteStrat(stratId: string): Observable<string> {
    return this.http
      .delete<void>(environment.apiUrl + this.controller + '/' + stratId)
      .pipe(
        map(() => {
          this.notificationService.displayNotification({
            message: 'Strat deleted !',
            type: NotificationType.success,
          });
          return stratId;
        }),
        catchError((err) => {
          this.notificationService.displayNotification({
            message: 'Cannot delete your strat',
            type: NotificationType.error,
          });
          return throwError(err);
        })
      );
  }

  public updateStrat(strat: Strat): Observable<Strat> {
    return this.http
      .patch<Strat>(environment.apiUrl + this.controller + '/', strat)
      .pipe(
        map((strat) => {
          this.notificationService.displayNotification({
            message: 'Strat updated !',
            type: NotificationType.success,
          });
          return strat;
        }),
        catchError((err) => {
          this.notificationService.displayNotification({
            message: 'Cannot update your strat',
            type: NotificationType.error,
          });
          return throwError(err);
        })
      );
  }

  public loadStratById(stratId: string): Observable<Strat> {
    return this.http
      .get<Strat>(environment.apiUrl + this.controller + '/' + stratId)
      .pipe(
        catchError((err) => {
          this.notificationService.displayNotification({
            message: 'Cannot get this strat',
            type: NotificationType.error,
          });
          return throwError(err);
        })
      );
  }
}
