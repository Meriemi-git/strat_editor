import { fabric } from 'fabric';
import { ObjectDrawer, DrawingMode } from '.';

export class TextDrawer implements ObjectDrawer {
  drawingMode: DrawingMode = DrawingMode.Text;

  make(
    x: number,
    y: number,
    options: fabric.ITextboxOptions
  ): Promise<fabric.Textbox> {
    return new Promise<fabric.Textbox>((resolve) => {
      const textbox = new fabric.Textbox('Your text here...', {
        ...options,
        fontStyle: options.fontStyle ?? '',
        fontWeight: options.fontWeight ?? '',
        fontFamily: options.fontFamily ?? '',
        underline: options.underline ?? false,
        left: x,
        top: y,
        editable: true,
      });
      console.log('textbox', textbox);
      resolve(textbox);
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
