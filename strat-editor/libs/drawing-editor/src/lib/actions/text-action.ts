import { DrawerActionType } from '../models/drawer-action-type';
import { DrawerAction } from './drawer-action';

export class TextAction extends DrawerAction {
  stroke: string;
  strokeWidth: number;
  color: string;
  font: string;

  constructor() {
    super();
    this.order = 1;
    this.name = 'text';
    this.type = DrawerActionType.TEXT;
  }
}
