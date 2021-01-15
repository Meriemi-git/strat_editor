import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PasswordChangeWrapper, UserDto, UserInfos } from '@strat-editor/data';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthentService {
  private controller = 'auth';

  constructor(private http: HttpClient) {}

  public login(userDto: UserDto): Observable<UserInfos> {
    return this.http
      .post<UserInfos>(environment.apiUrl + this.controller + '/login', userDto)
      .pipe(
        map((userInfos) => {
          localStorage.setItem('userInfos', JSON.stringify(userInfos));
          return userInfos;
        }),
        catchError((err) => {
          return throwError(err);
        })
      );
  }
  public refreshToken(): Observable<UserInfos> {
    return this.http
      .get<any>(environment.apiUrl + this.controller + '/refresh')
      .pipe(
        timeout(2000),
        catchError((err) => {
          console.log('Error refresh');
          return throwError(err);
        })
      );
  }

  register(userDto: UserDto): Observable<UserInfos> {
    return this.http
      .post<UserInfos>(
        environment.apiUrl + this.controller + '/register',
        userDto
      )
      .pipe(
        map((userInfos) => {
          localStorage.setItem('userInfos', JSON.stringify(userInfos));
          return userInfos;
        }),
        catchError((err) => {
          {
            return throwError(err);
          }
        })
      );
  }

  confirmEmail(token: string) {
    return this.http
      .post<any>(environment.apiUrl + this.controller + '/confirm', { token })
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  sendConfirmationEmail(userInfos: UserInfos) {
    return this.http
      .post<any>(
        environment.apiUrl + this.controller + '/send-confirmation-mail',
        {
          userMail: userInfos.userMail,
        }
      )
      .pipe(
        catchError((err) => {
          console.log('in service err', err);
          return throwError(err);
        })
      );
  }

  public disconnect() {
    localStorage.removeItem('userInfos');
    return this.http
      .get(environment.apiUrl + this.controller + '/disconnect')
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
        catchError((err) => {
          return throwError(err);
        })
      );
  }
}
