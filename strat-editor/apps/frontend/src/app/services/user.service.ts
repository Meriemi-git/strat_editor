import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import {
  NotificationType,
  PasswordChangeWrapper,
  UserInfos,
} from '@strat-editor/data';
import { NotificationService } from './notifications.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private controller = 'user';

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  getUserInfos(userId: string) {
    return this.http
      .get<UserInfos>(
        environment.apiUrl + this.controller + `/user-infos/${userId}`
      )
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  public changePassword(passwords: PasswordChangeWrapper) {
    return this.http
      .post(
        environment.apiUrl + this.controller + '/change-password',
        passwords
      )
      .pipe(
        map(() => {
          this.notificationService.displayNotification({
            message: 'Password successfully changed !',
            type: NotificationType.success,
          });
        }),
        catchError((err) => {
          return throwError(err);
        })
      );
  }
}
