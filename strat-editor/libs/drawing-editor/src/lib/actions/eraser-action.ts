import { DrawerActionType } from '../models/drawer-action-type';
import { DrawerAction } from './drawer-action';

export class EraserAction extends DrawerAction {
  constructor() {
    super();
    this.order = 2;
    this.name = 'eraser';
    this.label = 'Eraser';
    this.type = DrawerActionType.TOOL;
  }
}
