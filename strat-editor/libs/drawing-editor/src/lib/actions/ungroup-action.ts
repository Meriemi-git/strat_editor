import { DrawingActionType } from '../models/drawing-action-type';
import { DrawerAction } from './drawer-action';

export class UngroupAction extends DrawerAction {
  constructor() {
    super();
    this.name = 'ungroup';
    this.order = 4;
    this.type = DrawingActionType.TOOL;
  }
}
