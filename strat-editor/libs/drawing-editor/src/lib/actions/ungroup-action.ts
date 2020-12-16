import { DrawerActionType } from '../models/drawer-action-type';
import { DrawerAction } from './drawer-action';

export class UngroupAction extends DrawerAction {
  constructor() {
    super();
    this.name = 'ungroup';
    this.order = 4;
    this.type = DrawerActionType.TOOL;
  }
}
