import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FontService {
  private controller = 'font';
  constructor(private http: HttpClient) {}

  getAllFonts(): Observable<string[]> {
    return this.http
      .get<string[]>(environment.apiUrl + this.controller + '/all')
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(err);
        })
      );
  }
}
