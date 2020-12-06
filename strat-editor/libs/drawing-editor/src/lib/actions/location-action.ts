import { DrawingAction } from './drawing-action';

export class LocationAction extends DrawingAction{
  constructor(){
    super();
    this.name = "location";
  }
}
