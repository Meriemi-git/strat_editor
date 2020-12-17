import { DrawerActionType } from '../models/drawer-action-type';
import { DrawerAction } from './drawer-action';

export class FontAction extends DrawerAction {
  constructor(fontFamilly: string) {
    super();
    this.name = 'font';
    this.type = DrawerActionType.SETTING;
    this.drawerOptions.push({
      initialValue: 'Verdana',
      optionName: 'fontFamily',
      optionValue: fontFamilly,
    });
  }
}
