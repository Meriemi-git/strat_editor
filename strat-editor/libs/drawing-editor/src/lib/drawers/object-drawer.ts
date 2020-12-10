import { fabric } from 'fabric';
import { DrawingMode } from './drawing-mode';

export class ObjectDrawer {
  drawingMode: DrawingMode;
  // Makes the current object
  readonly make: (
    x: number, // Horizontal starting point
    y: number, // Vertical starting point
    options: fabric.IObjectOptions,
    x2?: number, // Horizontal ending point
    y2?: number // Vertical ending point
  ) => Promise<fabric.Object>;

  // Resizes the object (used during the mouseOver event below)
  readonly resize: (
    object: fabric.Object,
    x: number,
    y: number
  ) => Promise<fabric.Object>;

  readonly scale: (event: fabric.IEvent) => Promise<fabric.Object>;
}
