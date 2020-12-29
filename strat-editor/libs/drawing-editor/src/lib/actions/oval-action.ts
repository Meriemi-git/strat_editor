import { DrawerActionType } from '../models/drawer-action-type';
import { DrawerAction } from './drawer-action';

export class OvalAction extends DrawerAction {
  constructor() {
    super();
    this.order = 6;
    this.name = 'oval';
    this.label = 'Circle';
    this.type = DrawerActionType.SHAPE;
  }
}
