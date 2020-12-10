import { fabric } from 'fabric';
import { ObjectDrawer, DrawingMode } from '.';

export class TextDrawer implements ObjectDrawer {
  drawingMode: DrawingMode = DrawingMode.Text;

  make(
    x: number,
    y: number,
    options: fabric.IObjectOptions
  ): Promise<fabric.Object> {
    return new Promise<fabric.Object>((resolve) => {
      resolve(
        new fabric.Text('Test', {
          left: x,
          top: y,
          ...options,
        })
      );
    });
  }

  resize(object: fabric.Text, x: number, y: number): Promise<fabric.Object> {
    object
      .set({
        left: x,
        top: y,
      })
      .setCoords();

    return new Promise<fabric.Object>((resolve) => {
      resolve(object);
    });
  }

  scale = (event: fabric.IEvent): Promise<fabric.Object> => {
    return new Promise<fabric.Object>((resolve) => {
      resolve(event.target);
    });
  };
}
