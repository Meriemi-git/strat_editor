import { LineDrawer } from '../drawers/line-drawer';
import { DrawingAction } from './drawing-action';

export class ElipseAction extends DrawingAction{
  constructor(){
    super();
    this.name = "elipse";
    this.drawer = new LineDrawer();
  }
}
