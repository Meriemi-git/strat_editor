import { DrawingActionType } from '../models/drawing-action-type';
import { TextAction } from './text-action';

export class BoldAction extends TextAction {
  fontStyle: string = 'bold';
  constructor() {
    super();
    this.name = 'bold';
    this.order = 2;
    this.type = DrawingActionType.SETTING;
  }
}
