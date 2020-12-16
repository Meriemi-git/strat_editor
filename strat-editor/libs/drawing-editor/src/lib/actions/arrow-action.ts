import { DrawerActionType } from '../models/drawer-action-type';
import { DrawerAction } from './drawer-action';

export class ArrowAction extends DrawerAction {
  constructor() {
    super();
    this.order = 3;
    this.name = 'arrow';
    this.type = DrawerActionType.SHAPE;
  }
}
