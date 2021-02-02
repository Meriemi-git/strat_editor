import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Agent } from '@strat-editor/data';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  private controller = 'agent';
  constructor(private http: HttpClient) {}

  getAllAgents(): Observable<Agent[]> {
    return this.http
      .get<Agent[]>(environment.apiUrl + this.controller + '/all')
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
}
