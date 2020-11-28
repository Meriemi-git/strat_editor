import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Agent } from '@strat-editor/models';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  constructor(private http : HttpClient) {
  }

  getAllAgents(): Observable<Agent[]>{
    return this.http.get<Agent[]>(environment.apiUrl + "agents").pipe(
      catchError((err) => {
        console.log(err)
        return throwError(err);
    }));
  }
}
