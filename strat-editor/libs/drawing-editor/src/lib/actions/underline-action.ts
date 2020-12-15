import { DrawingActionType } from '../models/drawing-action-type';
import { DrawerAction } from './drawer-action';

export class UnderlineAction extends DrawerAction {
  textDecoration: string;
  constructor() {
    super();
    this.order = 4;
    this.name = 'underline';
    this.textDecoration = 'underline';
    this.type = DrawingActionType.SETTING;
  }
}
