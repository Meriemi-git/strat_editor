import { DrawerActionType } from '@strat-editor/data';
import { DrawerAction } from './drawer-action';

export class VideoAction extends DrawerAction {
  constructor() {
    super();
    this.name = 'video';
    this.label = 'Video';
    this.order = 4;
    this.type = DrawerActionType.FORM;
  }
}
