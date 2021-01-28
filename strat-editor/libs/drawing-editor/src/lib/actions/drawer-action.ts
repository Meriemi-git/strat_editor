import { DrawerActionType, DrawerOption } from '@strat-editor/data';
import { environment } from '../../environments/environment';

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
  public getIconUrl(): string {
    return `${environment.iconActionPath}/${this.name}.svg`;
  }
}
