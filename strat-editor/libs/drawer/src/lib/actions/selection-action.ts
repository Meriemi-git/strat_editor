import { LineDrawer } from '../drawers/line-drawer';
import { DrawingAction } from './drawing-action';

export class SelectionAction extends DrawingAction{
  constructor(){
    super();
    this.name = "selection";
    this.drawer = new LineDrawer();
  }
}
