import { DrawerActionType } from '../models/drawer-action-type';
import { DrawerAction } from './drawer-action';

export class TriangleAction extends DrawerAction {
  constructor() {
    super();
    this.name = 'triangle';
    this.label = 'Triangle';
    this.order = 4;
    this.type = DrawerActionType.SHAPE;
  }
}
