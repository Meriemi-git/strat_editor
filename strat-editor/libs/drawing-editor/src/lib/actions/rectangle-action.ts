import { DrawingAction } from './drawing-action';

export class RectangleAction extends DrawingAction{
  constructor(){
    super();
    this.name = "rectangle";
  }
}
