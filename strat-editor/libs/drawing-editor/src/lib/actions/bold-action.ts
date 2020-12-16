import { DrawerActionType } from '../models/drawer-action-type';
import { DrawerAction } from './drawer-action';

export class BoldAction extends DrawerAction {
  constructor() {
    super();
    this.name = 'bold';
    this.order = 2;
    this.type = DrawerActionType.SETTING;
    this.drawerOptions.push({
      initialValue: 'normal',
      optionName: 'fontWeight',
      optionValue: 'bold',
    });
  }
}
