import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthInfos, User, UserDto } from '@strat-editor/data';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private controller = 'user';

  constructor(private http: HttpClient) {}

  register(userDto: UserDto): Observable<User> {
    return this.http
      .post<User>(environment.apiUrl + this.controller + '/register', userDto)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  login(userDto: UserDto): Observable<AuthInfos> {
    return this.http
      .post<AuthInfos>(environment.apiUrl + this.controller + '/login', userDto)
      .pipe(
        catchError((err) => {
          return throwError(err);
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
}
