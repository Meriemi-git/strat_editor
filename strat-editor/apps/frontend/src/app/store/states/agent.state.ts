import { HttpErrorResponse } from '@angular/common/http';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Agent } from '@strat-editor/data';

export interface AgentState extends EntityState<Agent> {
  loaded: boolean;
  error: HttpErrorResponse;
  dragged: Agent;
}
