import { DrawingAction } from './drawing-action';

export class UngroupAction extends DrawingAction{
  constructor(){
    super();
    this.name = "ungroup";
  }
}
