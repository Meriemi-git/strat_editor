import { DrawerActionType } from '@strat-editor/data';
import { DrawerAction } from './drawer-action';

export class ItalicAction extends DrawerAction {
  constructor() {
    super();
    this.order = 3;
    this.name = 'italic';
    this.label = 'Italic';
    this.type = DrawerActionType.SETTING;
    this.drawerOptions.push({
      initialValue: 'normal',
      optionName: 'fontStyle',
      optionValue: 'italic',
    });
  }
}
