import { DrawingAction } from './drawing-action';

export class GroupAction extends DrawingAction{
  constructor(){
    super();
    this.name = "group";
  }
}
