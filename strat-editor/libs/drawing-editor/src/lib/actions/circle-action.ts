import { DrawerActionType } from '@strat-editor/data';
import { DrawerAction } from './drawer-action';

export class CircleAction extends DrawerAction {
  constructor() {
    super();
    this.order = 6;
    this.name = 'circle';
    this.label = 'Circle';
    this.type = DrawerActionType.SHAPE;
  }
}
