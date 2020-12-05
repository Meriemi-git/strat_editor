import { DrawingAction } from './drawing-action';

export class LineAction implements DrawingAction{
  name = "line"
  act(): void {
    throw new Error('Method not implemented.');
  }

}
