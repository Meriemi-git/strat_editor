import { fabric } from 'fabric';
import { LineArrow } from './line-arrow';

export class TriangleArrow extends fabric.Triangle {
  type: 'Arrow';
  public line: LineArrow;
}
