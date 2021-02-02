import { HttpErrorResponse } from '@angular/common/http';
import { EntityState } from '@ngrx/entity';
import { Strat } from '@strat-editor/data';

export interface StratState extends EntityState<Strat> {
  error: HttpErrorResponse;
  editing: Strat;
  loaded: Strat;
}
