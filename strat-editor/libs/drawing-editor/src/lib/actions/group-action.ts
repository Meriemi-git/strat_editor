import { DrawingActionType } from '../models/drawing-action-type';
import { DrawerAction } from './drawer-action';

export class GroupAction extends DrawerAction {
  constructor() {
    super();
    this.order = 3;
    this.name = 'group';
    this.type = DrawingActionType.TOOL;
  }
}
