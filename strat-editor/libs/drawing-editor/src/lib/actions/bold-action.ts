import { DrawingActionType } from '../models/drawing-action-type';
import { TextAction } from './text-action';

export class BoldAction extends TextAction {
  fontWeight: string;
  constructor() {
    super();
    this.name = 'bold';
    this.order = 2;
    this.fontWeight = 'bold';
    this.type = DrawingActionType.SETTING;
  }
}
