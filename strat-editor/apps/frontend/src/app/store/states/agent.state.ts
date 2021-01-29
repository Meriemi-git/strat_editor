import { HttpErrorResponse } from '@angular/common/http';
import { EntityState } from '@ngrx/entity';
import { Agent } from '@strat-editor/data';

export interface AgentState extends EntityState<Agent> {
  loaded: boolean;
  error: HttpErrorResponse;
  dragged: Agent;
}
