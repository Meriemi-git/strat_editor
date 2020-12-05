import { fabric } from 'fabric';
import { LineDrawer } from "./line-drawer";
import { ObjectDrawer } from "./object-drawer";
import { DrawingMode } from './drawing-mode';
import { CursorMode } from './cursor-mode';

export class DrawingEditor {

  private cursorMode: CursorMode;

  private canvas: fabric.Canvas;

  private drawer: ObjectDrawer; // Current drawer

  readonly drawerOptions: fabric.IObjectOptions; // Current drawer options

  private readonly drawers: ObjectDrawer[]; // All possible drawers

  private object: fabric.Object; // The object currently being drawn

  private isDown: boolean; //Is user dragging the mouse?

  constructor(private readonly selector: string, canvasWidth: number, canvasHeight: number) {
      // To start,
      // user is NOT dragging the mouse
      this.isDown = false;
      // user is drawing
      this.cursorMode = CursorMode.Draw;
      // Create the Fabric canvas
      this.canvas = new fabric.Canvas(selector, {selection : false});
      this.canvas.setWidth(canvasWidth);
      this.canvas.setHeight(canvasHeight);

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
        const pointer = this.canvas.getPointer(o.e);
        this.mouseDown(pointer.x, pointer.y);
    });

    this.canvas.on('mouse:move', (o) => {
      const pointer = this.canvas.getPointer(o.e);
      this.mouseMove(pointer.x, pointer.y);
    });

    this.canvas.on('mouse:up', () => {
      this.isDown = false;
   });

   this.canvas.on('selection:created', (o) => {
    this.cursorMode = CursorMode.Select;
    // sets currently selected object
    this.object = o.target;
  });

  this.canvas.on('selection:cleared', () => {
      this.cursorMode = CursorMode.Draw;
  });
}

  private async mouseDown(x: number, y: number): Promise<void> {
    this.isDown = true; //The mouse is being clicked

    if (this.cursorMode !== CursorMode.Draw) {
      return;
    }

    // Create an object at the point (x,y)
    this.object = await this.make(x, y);

    // Add the object to the canvas
    this.canvas.add(this.object);

    // Renders all objects to the canvas
    this.canvas.renderAll();
  }

  private mouseMove(x: number, y: number): void {
    if (!(this.cursorMode === CursorMode.Draw && this.isDown)) {
        return;
    }
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

      if(that.canvas.width < that.canvas.height ){
        const scaleX =  that.canvas.width / img.width
        that.canvas.setBackgroundImage(img, that.canvas.renderAll.bind(that.canvas), {
          scaleX:  scaleX,
          scaleY:  scaleX,
          top: that.canvas.getCenter().top,
          left:  that.canvas.getCenter().left,
          originX: 'center',
          originY: 'center'
       });
      } else {
        const scaleY =  that.canvas.height / img.height
        that.canvas.setBackgroundImage(img, that.canvas.renderAll.bind(that.canvas), {
          scaleX:  scaleY,
          scaleY:  scaleY,
          top: that.canvas.getCenter().top,
          left:  that.canvas.getCenter().left,
          originX: 'center',
          originY: 'center'
       });
      }
    });
  }

  resize(screenWidth: number, canvasHeight: number) {
    this.canvas.setWidth(screenWidth);
    this.canvas.setHeight(canvasHeight);
  }

  updatePointerIcon(actionName: string) {
    // TODO change mouse cursor
  }
}
