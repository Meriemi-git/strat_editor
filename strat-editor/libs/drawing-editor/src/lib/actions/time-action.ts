import { DrawingActionType } from '../models/drawing-action-type';
import { DrawerAction } from './drawer-action';

export class TimeAction extends DrawerAction {
  constructor() {
    super();
    this.name = 'time';
    this.order = 3;
    this.type = DrawingActionType.FORM;
  }
}
