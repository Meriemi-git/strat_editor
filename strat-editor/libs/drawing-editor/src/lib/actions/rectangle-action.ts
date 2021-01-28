import { DrawerActionType } from '@strat-editor/data';
import { DrawerAction } from './drawer-action';

export class RectangleAction extends DrawerAction {
  constructor() {
    super();
    this.name = 'rectangle';
    this.label = 'Rectangle';
    this.order = 5;
    this.type = DrawerActionType.SHAPE;
  }
}
