import { DrawerActionType } from '../models/drawer-action-type';
import { DrawerAction } from './drawer-action';

export class TimeAction extends DrawerAction {
  constructor() {
    super();
    this.name = 'time';
    this.order = 3;
    this.type = DrawerActionType.FORM;
  }
}
