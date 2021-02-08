import { HttpErrorResponse } from '@angular/common/http';
import { EntityState } from '@ngrx/entity';
import { Layer, Strat, StratAction } from '@strat-editor/data';

export interface StratState extends EntityState<Strat> {
  error: HttpErrorResponse;
  strat: Strat;
  currentLayer: Layer;
  action: StratAction;
}
