import { DrawerActionType } from '@strat-editor/data';
import { DrawerAction } from './drawer-action';

export class TextAction extends DrawerAction {
  constructor() {
    super();
    this.order = 1;
    this.name = 'text';
    this.label = 'Text';
    this.type = DrawerActionType.TEXT;
  }
}
