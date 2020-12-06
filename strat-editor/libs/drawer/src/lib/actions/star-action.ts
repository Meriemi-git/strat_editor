import { LineDrawer } from '../drawers/line-drawer';
import { DrawingAction } from './drawing-action';

export class StarAction extends DrawingAction{
  constructor(){
    super();
    this.name = "star";
    this.drawer = new LineDrawer();
  }
}
