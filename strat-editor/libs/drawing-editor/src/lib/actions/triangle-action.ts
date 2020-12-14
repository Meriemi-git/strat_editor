import { DrawingActionType } from '../models/drawing-action-type';
import { DrawerAction } from './drawer-action';

export class TriangleAction extends DrawerAction {
  constructor() {
    super();
    this.name = 'triangle';
    this.order = 4;
    this.type = DrawingActionType.SHAPE;
  }
}
