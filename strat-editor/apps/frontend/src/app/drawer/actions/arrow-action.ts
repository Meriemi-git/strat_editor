import { LineDrawer } from '../drawers/line-drawer';
import { DrawingAction } from './drawing-action';

export class ArrowAction extends DrawingAction{

  constructor(){
    super();
    this.name = "arrow";
    this.drawer = new LineDrawer();
  }
}
