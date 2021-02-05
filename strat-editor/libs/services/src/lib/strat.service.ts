import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationType, Strat } from '@strat-editor/data';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
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

  public getAllStrats(userId: string): Observable<Strat[]> {
    return this.http
      .get<Strat[]>(environment.apiUrl + this.controller + '/all/' + userId)
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
        catchError((err) => {
          this.notificationService.displayNotification({
            message: 'Cannot save your strat',
            type: NotificationType.error,
          });
          return throwError(err);
        })
      );
  }

  public deleteStrat(stratId: string): Observable<void> {
    return this.http
      .delete<void>(environment.apiUrl + this.controller + '/' + stratId)
      .pipe(
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
        catchError((err) => {
          this.notificationService.displayNotification({
            message: 'Cannot update your strat',
            type: NotificationType.error,
          });
          return throwError(err);
        })
      );
  }
}
