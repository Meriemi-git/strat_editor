import { fabric } from 'fabric';
import { ObjectDrawer, DrawingMode } from '.';

export class TextDrawer implements ObjectDrawer {
  drawingMode: DrawingMode = DrawingMode.Text;

  make(
    x: number,
    y: number,
    options: fabric.IObjectOptions
  ): Promise<fabric.Textbox> {
    return new Promise<fabric.Textbox>((resolve) => {
      console.log('options', options);
      resolve(
        new fabric.Textbox('Test', {
          left: x,
          top: y,
          editable: true,
          ...options,
        })
      );
    });
  }

  resize(object: fabric.Textbox, x: number, y: number): Promise<fabric.Object> {
    object
      .set({
        left: x,
        top: y,
      })
      .setCoords();

    return new Promise<fabric.Textbox>((resolve) => {
      resolve(object);
    });
  }
}
