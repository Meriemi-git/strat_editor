import { DrawerActionType } from '@strat-editor/data';
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
