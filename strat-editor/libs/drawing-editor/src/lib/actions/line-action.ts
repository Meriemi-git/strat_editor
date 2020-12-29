import { DrawerActionType } from '../models/drawer-action-type';
import { DrawerAction } from './drawer-action';

export class LineAction extends DrawerAction {
  constructor() {
    super();
    this.order = 2;
    this.name = 'line';
    this.label = 'Line';
    this.type = DrawerActionType.SHAPE;
  }
}
