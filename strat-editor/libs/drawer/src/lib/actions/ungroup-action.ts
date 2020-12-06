import { LineDrawer } from '../drawers/line-drawer';
import { DrawingAction } from './drawing-action';

export class UngroupAction extends DrawingAction{
  constructor(){
    super();
    this.name = "ungroup";
    this.drawer = new LineDrawer();
  }
}
