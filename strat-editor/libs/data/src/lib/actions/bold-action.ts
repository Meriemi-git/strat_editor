import { DrawerActionType } from '../enums';
import { DrawerAction } from './drawer-action';

export class BoldAction extends DrawerAction {
  constructor() {
    super();
    this.name = 'bold';
    this.label = 'Bold';
    this.order = 2;
    this.type = DrawerActionType.SETTING;
    this.drawerOptions.push({
      initialValue: 'normal',
      optionName: 'fontWeight',
      optionValue: 'bold',
    });
  }
}
