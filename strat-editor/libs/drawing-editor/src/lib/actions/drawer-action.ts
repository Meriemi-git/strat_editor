import { environment } from '../../environments/environment';
import { DrawerActionType } from '../models/drawer-action-type';
import { DrawerOption } from '../models/drawer-option';

export abstract class DrawerAction {
  name: string;
  order: number;
  type: DrawerActionType;
  active: boolean;
  drawerOptions: DrawerOption[];
  constructor() {
    this.active = false;
    this.drawerOptions = [];
  }
  public getIconUrl(): string {
    return `${environment.iconActionPath}/${this.name}.svg`;
  }
}
