import { DrawingActionType } from '../models/drawing-action-type';
import { DrawerAction } from './drawer-action';

export class ArrowAction extends DrawerAction {
  constructor() {
    super();
    this.order = 3;
    this.name = 'arrow';
    this.type = DrawingActionType.SHAPE;
  }
}
