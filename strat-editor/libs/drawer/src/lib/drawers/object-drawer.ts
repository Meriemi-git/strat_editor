import { fabric } from 'fabric'
import { DrawingMode } from './drawing-mode';

export interface ObjectDrawer {

  drawingMode: DrawingMode;
  origX: number;
  origY: number;
  // Makes the current object
   make (
    x: number, //Horizontal starting point
    y: number, //Vertical starting point
    options: fabric.IObjectOptions,
    x2?: number, //Horizontal ending point
    y2?: number) //Vertical ending point
          : Promise<fabric.Object>;

  // Resizes the object (used during the mouseOver event below)
  resize(object: fabric.Object, x: number, y: number)
       : Promise<fabric.Object>
}
