import { DrawingActionType } from '../models/drawing-action-type';
import { DrawerAction } from './drawer-action';

export class RectangleAction extends DrawerAction {
  constructor() {
    super();
    this.name = 'rectangle';
    this.order = 5;
    this.type = DrawingActionType.SHAPE;
  }
}
