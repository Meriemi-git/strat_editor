import { DrawingAction } from './drawing-action';

export class OvalAction extends DrawingAction{
  constructor(){
    super();
    this.name = "oval";
  }
}
