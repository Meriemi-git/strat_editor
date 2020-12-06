import { DrawingAction } from './drawing-action';

export class CurveAction extends DrawingAction{
  constructor(){
    super();
    this.name = "curve";
  }
}
