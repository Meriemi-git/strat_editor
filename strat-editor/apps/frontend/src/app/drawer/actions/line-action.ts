import { LineDrawer } from '../drawers/line-drawer';
import { DrawingAction } from './drawing-action';

export class LineAction extends DrawingAction{
  constructor(){
    super();
    this.name = "line";
    this.drawer = new LineDrawer();
  }
}
