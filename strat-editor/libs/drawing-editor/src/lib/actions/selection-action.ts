import { DrawerAction } from './drawer-action';

export class SelectionAction extends DrawerAction {
  constructor() {
    super();
    this.name = 'selection';
  }
}
