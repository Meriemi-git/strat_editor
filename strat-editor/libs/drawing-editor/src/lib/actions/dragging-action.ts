import { DrawerActionType } from '../models/drawer-action-type';
import { DrawerAction } from './drawer-action';

export class DraggingAction extends DrawerAction {
  constructor() {
    super();
    this.name = 'dragging';
    this.label = 'Dragging';
    this.order = 2;
    this.type = DrawerActionType.TOOL;
  }
}
