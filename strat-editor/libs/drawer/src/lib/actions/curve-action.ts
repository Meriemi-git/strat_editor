import { LineDrawer } from '../drawers/line-drawer';
import { DrawingAction } from './drawing-action';

export class CurveAction extends DrawingAction{
  constructor(){
    super();
    this.name = "curve";
    this.drawer = new LineDrawer();
  }
}
