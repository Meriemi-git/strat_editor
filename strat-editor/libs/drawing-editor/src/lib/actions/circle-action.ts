import { DrawingActionType } from '../models/drawing-action-type';
import { DrawerAction } from './drawer-action';

export class CircleAction extends DrawerAction {
  constructor() {
    super();
    this.order = 6;
    this.name = 'circle';
    this.type = DrawingActionType.SHAPE;
  }
}
