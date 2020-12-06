import { LineDrawer } from '../drawers/line-drawer';
import { DrawingAction } from './drawing-action';

export class CircleAction extends DrawingAction{
  constructor(){
    super();
    this.name = "circle";
    this.drawer = new LineDrawer();
  }
}
