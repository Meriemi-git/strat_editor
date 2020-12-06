import { DrawingAction } from './drawing-action';
import { RectangleDrawer } from '../drawers/rectangle-drawer';

export class RectangleAction extends DrawingAction{
  constructor(){
    super();
    this.name = "rectangle";
    this.drawer = new RectangleDrawer();
  }
}
