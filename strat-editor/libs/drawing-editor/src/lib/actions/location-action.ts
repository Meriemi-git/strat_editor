import { DrawerActionType } from '@strat-editor/data';
import { DrawerAction } from './drawer-action';

export class LocationAction extends DrawerAction {
  constructor() {
    super();
    this.order = 2;
    this.name = 'location';
    this.type = DrawerActionType.FORM;
  }
}
