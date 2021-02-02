import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Map } from '@strat-editor/data';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private controller = 'map';

  constructor(private http: HttpClient) {}

  getAllMaps(): Observable<Map[]> {
    return this.http
      .get<Map[]>(environment.apiUrl + this.controller + '/all')
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(err);
        })
      );
  }
}
