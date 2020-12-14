import { DrawingActionType } from '../models/drawing-action-type';
import { TextAction } from './text-action';

export class ItalicAction extends TextAction {
  fontStyle: string = 'italic';
  constructor() {
    super();
    this.order = 3;
    this.name = 'italic';
    this.type = DrawingActionType.SETTING;
  }
}
