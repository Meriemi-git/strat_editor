import { LineDrawer } from '../drawers/line-drawer';
import { DrawingAction } from './drawing-action';

export class GroupAction extends DrawingAction{
  constructor(){
    super();
    this.name = "group";
    this.drawer = new LineDrawer();
  }
}
