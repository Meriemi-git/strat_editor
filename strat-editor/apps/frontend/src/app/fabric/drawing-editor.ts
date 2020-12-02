import { fabric } from 'fabric';
import { LineDrawer } from "./line-drawer";
import { ObjectDrawer } from "./object-drawer";
import { DrawingMode } from './drawing-mode';
import * as $ from "jquery";

export class DrawingEditor {

  private canvas: fabric.Canvas;

  private drawer: ObjectDrawer; // Current drawer

  readonly drawerOptions: fabric.IObjectOptions; // Current drawer options

  private readonly drawers: ObjectDrawer[]; // All possible drawers

  private object: fabric.Object; // The object currently being drawn

  private isDown: boolean; //Is user dragging the mouse?

  constructor(private readonly selector: string, canvasWidth: number, canvasHeight: number) {

      //$(`#${selector}`).replaceWith(`<canvas id="${selector}" height=${canvasHeight} width=${canvasWidth}> </canvas>`);

      this.isDown = false; //To start, user is NOT dragging the mouse

      // Create the Fabric canvas
      this.canvas = new fabric.Canvas(selector, {selection : false});
      this.canvas.setWidth(canvasWidth);
      this.canvas.setHeight(canvasHeight);
      console.log(this.canvas);
      this.canvas.add(new fabric.IText('Hello World !'));
      //Create a collection of all possible "drawer" classes
      this.drawers = [
          new LineDrawer(),
      ];

      //Set the current "drawer" class
      this.drawer = this.drawers[DrawingMode.Line];

      //Set the default options for the "drawer" class, including
      //stroke color, width, and style
      this.drawerOptions = {
          stroke: 'black',
          strokeWidth: 1,
          selectable: true,
          strokeUniform: true
      };
      this.setBackgroundImageFromUrl = this.setBackgroundImageFromUrl.bind(this);
      this.initializeCanvasEvents();
  }

  private initializeCanvasEvents() {
    this.canvas.on('mouse:down', (o) => {
        console.log('mouse:down');
        const pointer = this.canvas.getPointer(o.e);
        this.mouseDown(pointer.x, pointer.y);
    });
    this.canvas.on('mouse:move', (o) => {
      console.log('mouse:move');
      const pointer = this.canvas.getPointer(o.e);
      this.mouseMove(pointer.x, pointer.y);
    });
    this.canvas.on('mouse:up', () => {
      console.log('mouse:up');
      this.isDown = false;
   });
}

  private async mouseDown(x: number, y: number): Promise<void> {
    this.isDown = true; //The mouse is being clicked

    // Create an object at the point (x,y)
    this.object = await this.make(x, y);

    // Add the object to the canvas
    this.canvas.add(this.object);

    // Renders all objects to the canvas
    this.canvas.renderAll();
  }

  private mouseMove(x: number, y: number): void {
    if (!this.isDown) {
        return; // If the user isn't holding the mouse button, do nothing
    }

    // Use the Resize method from the IObjectDrawer interface
    this.drawer.resize(this.object, x, y);
    this.canvas.renderAll();
  }

  // Method which allows any drawer to Promise their make() function
  private async make(x: number, y: number): Promise<fabric.Object> {
    return await this.drawer.make(x, y, this.drawerOptions);
  }

  public setBackgroundImageFromUrl(imageUrl : string) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this
    fabric.Image.fromURL(imageUrl, function(img) {
      that.canvas.setBackgroundImage(img, that.canvas.renderAll.bind(that.canvas), {
        scaleX:  that.canvas.width / img.width,
        scaleY:  that.canvas.height / img.height
     });
    });
  }
}
