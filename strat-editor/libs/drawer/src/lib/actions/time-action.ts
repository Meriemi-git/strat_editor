import { LineDrawer } from '../drawers/line-drawer';
import { DrawingAction } from './drawing-action';

export class TimeAction extends DrawingAction{
  constructor(){
    super();
    this.name = "time";
    this.drawer = new LineDrawer();
  }
}
