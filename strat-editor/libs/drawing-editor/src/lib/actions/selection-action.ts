import { DrawingAction } from './drawing-action';

export class SelectionAction extends DrawingAction{
  constructor(){
    super();
    this.name = "selection";
  }
}
