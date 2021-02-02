import { DrawerActionType } from '../enums';
import { DrawerOption } from '../helpers';

export abstract class DrawerAction {
  name: string;
  label: string;
  order: number;
  type: DrawerActionType;
  active: boolean;
  drawerOptions: DrawerOption[];
  constructor() {
    this.active = false;
    this.drawerOptions = [];
  }
}
