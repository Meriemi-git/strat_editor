import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  map,
  catchError,
  mergeMap,
  withLatestFrom,
  filter,
} from 'rxjs/operators';
import { of } from 'rxjs';
import * as actions from '../actions/agent.action';
import { AgentService } from '../../services/agent.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StratEditorState } from '../reducers';
import { Store } from '@ngrx/store';
import * as Selectors from '../selectors';

@Injectable()
export class AgentEffect {
  constructor(
    private actions$: Actions,
    private agentService: AgentService,
    private store: Store<StratEditorState>
  ) {}

  fechagents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.FetchAgents.type),
      mergeMap(() =>
        this.agentService.getAllAgents().pipe(
          map((agents) => actions.FetchAgentsSuccess({ agents: agents })),
          catchError((err: HttpErrorResponse) =>
            of(actions.FetchAgentsError({ error: err.message }))
          )
        )
      )
    )
  );
}
