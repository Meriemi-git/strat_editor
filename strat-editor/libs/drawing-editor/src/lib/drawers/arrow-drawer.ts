import { fabric } from 'fabric';
import { ObjectDrawer } from './object-drawer';
import { LineMode } from './line-mode';
import { LineArrow } from '../fabricjs/line-arrow';
import { TriangleArrow } from '../fabricjs/triangle-arrow';
import * as uuid from 'uuid';

export class ArrowDrawer implements ObjectDrawer {
  private originX: number;
  private originY: number;

  drawingMode: LineMode = LineMode.Line;

  make(
    x: number,
    y: number,
    options: fabric.IObjectOptions,
    x2?: number,
    y2?: number
  ): Promise<LineArrow> {
    this.originX = x;
    this.originY = y;
    return new Promise<LineArrow>((resolve) => {
      resolve(this.createArrow(x, y, options, x2, y2));
    });
  }

  scale = (event: fabric.IEvent): Promise<fabric.Object> => {
    return new Promise<fabric.Object>((resolve) => {
      resolve(event.target);
    });
  };

  createArrow(
    x: number,
    y: number,
    options: fabric.IObjectOptions,
    x2?: number,
    y2?: number
  ): LineArrow {
    const uid = uuid.v4();
    const triangle = new TriangleArrow({
      ...options,
      left: x,
      top: y,
      width: 20,
      height: 20,
      fill: options.stroke,
      originX: 'center',
      originY: 'center',
      strokeUniform: false,
      name: 'TriangleArrow',
      selectable: false,
    });
    const line = new LineArrow([x, y, x2, y2], {
      ...options,
      left: x,
      top: y,
      originX: 'center',
      originY: 'center',
      strokeUniform: false,
      name: 'LineArrow',
      selectable: false,
    });
    triangle.line = line;
    triangle.uid = uid;
    line.triangle = triangle;
    line.uid = uid;
    return line;
  }

  resize(arrow: LineArrow, x: number, y: number): Promise<LineArrow> {
    const angle = this.calcArrowAngle(this.originX, this.originY, x, y) - 90;
    arrow.triangle.set({
      angle: angle,
    });

    arrow
      .set({
        x2: x,
        y2: y,
      })
      .setCoords();

    return new Promise<LineArrow>((resolve) => {
      resolve(arrow);
    });
  }

  calcArrowAngle(x1: number, y1: number, x2: number, y2: number): number {
    var angle = 0,
      x,
      y;
    x = x2 - x1;
    y = y2 - y1;
    if (x === 0) {
      angle = y === 0 ? 0 : y > 0 ? Math.PI / 2 : (Math.PI * 3) / 2;
    } else if (y === 0) {
      angle = x > 0 ? 0 : Math.PI;
    } else {
      angle =
        x < 0
          ? Math.atan(y / x) + Math.PI
          : y < 0
          ? Math.atan(y / x) + 2 * Math.PI
          : Math.atan(y / x);
    }

    return (angle * 180) / Math.PI;
  }
}
