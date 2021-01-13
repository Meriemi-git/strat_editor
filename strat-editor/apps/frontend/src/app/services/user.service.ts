import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private controller = 'user';

  constructor(private http: HttpClient) {}

  testAuthent(): Observable<string> {
    console.log('testAuthent');
    return this.http
      .get<string>(environment.apiUrl + this.controller + '/details')
      .pipe(
        map((result) => {
          console.log('ondetails', result);
          return result;
        }),
        catchError((err) => {
          console.log('Error in service :', err);
          return throwError(err);
        })
      );
  }
}
