import { LineDrawer } from '../drawers/line-drawer';
import { DrawingAction } from './drawing-action';

export class LocationAction extends DrawingAction{
  constructor(){
    super();
    this.name = "location";
    this.drawer = new LineDrawer();
  }
}
