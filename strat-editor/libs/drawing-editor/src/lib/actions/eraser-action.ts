import { DrawingAction } from './drawing-action';

export class EraserAction extends DrawingAction{
  constructor(){
    super();
    this.name = "eraser";
  }
}
