import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDto, UserInfos } from '@strat-editor/data';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  public logout() {
    localStorage.removeItem('userInfos');
    return this.http.get(environment.apiUrl + this.controller + '/logout').pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }
}
