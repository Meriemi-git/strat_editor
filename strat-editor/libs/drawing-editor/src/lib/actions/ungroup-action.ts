import { DrawerAction } from './drawer-action';

export class UngroupAction extends DrawerAction {
  constructor() {
    super();
    this.name = 'ungroup';
  }
}
