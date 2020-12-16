import { DrawerActionType } from '../models/drawer-action-type';
import { DrawerAction } from './drawer-action';

export class RectangleAction extends DrawerAction {
  constructor() {
    super();
    this.name = 'rectangle';
    this.order = 5;
    this.type = DrawerActionType.SHAPE;
  }
}
