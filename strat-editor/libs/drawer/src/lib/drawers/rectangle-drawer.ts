import {fabric} from 'fabric';
import { DrawingMode } from './drawing-mode';
import { ObjectDrawer } from './object-drawer';

export class RectangleDrawer implements ObjectDrawer {


  drawingMode: DrawingMode = DrawingMode.Rectangle;

  constructor(){
    this.make.bind(this);
  }
  origX: number;
  origY: number;

  make(x: number, y: number, options: fabric.IObjectOptions, width?: number, height?: number): Promise<fabric.Object> {
      console.log("Rectanglr Drawer make x : " + x + " y : " + y );
      console.log(this);
      return new Promise<fabric.Object>(resolve => {
          resolve(new fabric.Rect({
              left: x,
              top: y,
              width: width,
              height: height,
              fill: 'transparent',
              ...options
          }));
      });
  }

  resize(object: fabric.Rect, x: number, y: number): Promise<fabric.Object> {
      //Calculate size and orientation of resized rectangle
      console.log("Rectangle Drawer resize x : " + x + " y : " + y );
      object.set({
          originX: this.origX > x ? 'right' : 'left',
          originY: this.origY > y ? 'bottom' : 'top',
          width: Math.abs(this.origX - x),
          height: Math.abs(this.origY - y),
      }).setCoords();

      return new Promise<fabric.Object>(resolve => {
          resolve(object);
      });
  }
}
