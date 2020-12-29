import { fabric } from 'fabric';
import { DrawingMode } from './drawing-mode';
import { ObjectDrawer } from './object-drawer';

export class RectangleDrawer extends ObjectDrawer {
  drawingMode: DrawingMode = DrawingMode.Rectangle;

  private origX: number = 0;
  private origY: number = 0;

  make = (
    x: number,
    y: number,
    options: fabric.IObjectOptions,
    width?: number,
    height?: number
  ): Promise<fabric.Object> => {
    this.origX = x;
    this.origY = y;
    return new Promise<fabric.Object>((resolve) => {
      resolve(
        new fabric.Rect({
          ...options,
          left: x,
          top: y,
          width: width,
          height: height,
          selectable: false,
          fill: 'transparent',
        })
      );
    });
  };

  resize = (
    object: fabric.Rect,
    x: number,
    y: number
  ): Promise<fabric.Object> => {
    // Calculate size and orientation of resized rectangle
    object
      .set({
        originX: this.origX > x ? 'right' : 'left',
        originY: this.origY > y ? 'bottom' : 'top',
        width: Math.abs(this.origX - x),
        height: Math.abs(this.origY - y),
      })
      .setCoords();
    return new Promise<fabric.Object>((resolve) => {
      resolve(object);
    });
  };
}
