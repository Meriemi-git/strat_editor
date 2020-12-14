import { DrawingActionType } from '../models/drawing-action-type';
import { DrawerAction } from './drawer-action';

export class EraserAction extends DrawerAction {
  constructor() {
    super();
    this.order = 2;
    this.name = 'eraser';
    this.type = DrawingActionType.TOOL;
  }
}
