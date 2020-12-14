import { DrawingActionType } from '../models/drawing-action-type';
import { DrawerAction } from './drawer-action';

export class PictureAction extends DrawerAction {
  constructor() {
    super();
    this.name = 'picture';
    this.order = 4;
    this.type = DrawingActionType.FORM;
  }
}
