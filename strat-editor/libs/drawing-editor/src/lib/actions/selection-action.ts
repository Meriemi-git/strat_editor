import { DrawerActionType } from '../models/drawer-action-type';
import { DrawerAction } from './drawer-action';

export class SelectionAction extends DrawerAction {
  constructor() {
    super();
    this.name = 'selection';
    this.label = 'Selection';
    this.order = 1;
    this.type = DrawerActionType.TOOL;
  }
}
