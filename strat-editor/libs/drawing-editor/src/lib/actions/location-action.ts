import { DrawingActionType } from '../models/drawing-action-type';
import { DrawerAction } from './drawer-action';

export class LocationAction extends DrawerAction {
  constructor() {
    super();
    this.order = 2;
    this.name = 'location';
    this.type = DrawingActionType.FORM;
  }
}
