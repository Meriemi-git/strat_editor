import { environment } from '../../environments/environment';
import { DrawingActionType } from '../models/drawing-action-type';

export abstract class DrawerAction {
  name: string;
  order: number;
  type: DrawingActionType;
  active: boolean;
  constructor() {
    this.active = false;
  }
  public getIconUrl(): string {
    return `${environment.iconActionPath}/${this.name}.svg`;
  }
}
