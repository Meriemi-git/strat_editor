import { DrawerActionType } from '../models/drawer-action-type';
import { DrawerAction } from './drawer-action';

export class PictureAction extends DrawerAction {
  constructor() {
    super();
    this.name = 'picture';
    this.order = 4;
    this.type = DrawerActionType.FORM;
  }
}
