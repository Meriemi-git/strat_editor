import { LineDrawer } from '../drawers/line-drawer';
import { DrawingAction } from './drawing-action';

export class TriangleAction extends DrawingAction{
  constructor(){
    super();
    this.name = "triangle";
    this.drawer = new LineDrawer();
  }
}
