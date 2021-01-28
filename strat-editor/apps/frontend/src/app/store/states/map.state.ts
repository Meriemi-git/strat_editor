import { EntityState } from '@ngrx/entity';
import { Floor, Map } from '@strat-editor/data';

export interface MapState extends EntityState<Map> {
  loaded: boolean;
  error: string;
  selectedMap: Map;
  selectedFloor: Floor;
}
