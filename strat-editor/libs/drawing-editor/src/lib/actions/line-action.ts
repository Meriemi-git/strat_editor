import { DrawingAction } from './drawing-action';

export class LineAction extends DrawingAction{
  constructor(){
    super();
    this.name = "line";
  }
}
