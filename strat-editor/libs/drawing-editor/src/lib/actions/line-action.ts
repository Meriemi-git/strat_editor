import { DrawingActionType } from '../models/drawing-action-type';
import { DrawerAction } from './drawer-action';

export class LineAction extends DrawerAction {
  constructor() {
    super();
    this.order = 2;
    this.name = 'line';
    this.type = DrawingActionType.SHAPE;
  }
}
