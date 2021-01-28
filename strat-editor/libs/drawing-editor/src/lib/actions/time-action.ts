import { DrawerActionType } from '@strat-editor/data';
import { DrawerAction } from './drawer-action';

export class TimeAction extends DrawerAction {
  constructor() {
    super();
    this.name = 'time';
    this.order = 3;
    this.type = DrawerActionType.FORM;
  }
}
