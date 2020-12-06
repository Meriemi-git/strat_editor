import { LineDrawer } from '../drawers/line-drawer';
import { DrawingAction } from './drawing-action';

export class PictureAction extends DrawingAction{
  constructor(){
    super();
    this.name = "picture";
    this.drawer = new LineDrawer();
  }
}
