import { DrawerAction } from './drawer-action';

export class TextAction extends DrawerAction {
  stroke: string;
  strokeWidth: number;
  color: string;
  font: string;

  constructor() {
    super();
    this.name = 'text';
    this.stroke = 'black';
    this.strokeWidth = 2;
    this.font = 'verdana';
  }
}
