import { DrawingActionType } from '../models/drawing-action-type';
import { DrawerAction } from './drawer-action';

export class StarAction extends DrawerAction {
  constructor() {
    super();
    this.name = 'star';
    this.order = 1;
    this.type = DrawingActionType.FORM;
  }
}
