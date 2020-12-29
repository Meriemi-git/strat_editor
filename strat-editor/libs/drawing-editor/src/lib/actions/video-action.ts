import { DrawerActionType } from '../models/drawer-action-type';
import { DrawerAction } from './drawer-action';

export class VideoAction extends DrawerAction {
  constructor() {
    super();
    this.name = 'video';
    this.label = 'Video';
    this.order = 3;
    this.type = DrawerActionType.TOOL;
  }
}
