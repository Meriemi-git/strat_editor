import { DrawingAction } from './drawing-action';

export class TextAction extends DrawingAction{
  constructor(){
    super();
    this.name = "text";
  }
}
