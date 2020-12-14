import { DrawingActionType } from '../models/drawing-action-type';
import { DrawerAction } from './drawer-action';

export class UnderlineAction extends DrawerAction {
  constructor() {
    super();
    this.order = 4;
    this.name = 'underline';
    this.type = DrawingActionType.SETTING;
  }
}
