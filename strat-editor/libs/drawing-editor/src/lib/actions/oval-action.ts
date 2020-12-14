import { DrawingActionType } from '../models/drawing-action-type';
import { DrawerAction } from './drawer-action';

export class OvalAction extends DrawerAction {
  constructor() {
    super();
    this.order = 6;
    this.name = 'oval';
    this.type = DrawingActionType.SHAPE;
  }
}
