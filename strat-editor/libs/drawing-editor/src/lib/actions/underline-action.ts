import { DrawerActionType } from '../models/drawer-action-type';
import { DrawerAction } from './drawer-action';

export class UnderlineAction extends DrawerAction {
  constructor() {
    super();
    this.order = 4;
    this.name = 'underline';
    this.type = DrawerActionType.SETTING;
    this.drawerOptions.push({
      initialValue: false,
      optionName: 'underline',
      optionValue: true,
    });
  }
}
