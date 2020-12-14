import { DrawingActionType } from '../models/drawing-action-type';
import { DrawerAction } from './drawer-action';

export class SelectionAction extends DrawerAction {
  constructor() {
    super();
    this.name = 'selection';
    this.order = 1;
    this.type = DrawingActionType.TOOL;
  }
}
