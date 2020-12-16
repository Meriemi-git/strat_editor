import { DrawerActionType } from '../models/drawer-action-type';
import { DrawerAction } from './drawer-action';

export class PolyLineAction extends DrawerAction {
  constructor() {
    super();
    this.name = 'polyline';
    this.order = 1;
    this.type = DrawerActionType.SHAPE;
  }
}
