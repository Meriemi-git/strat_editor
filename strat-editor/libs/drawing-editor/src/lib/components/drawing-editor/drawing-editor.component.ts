import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { fabric } from 'fabric';
import { DrawerAction } from '../../actions';
import { CursorMode } from '../../cursor-mode';
import { ObjectDrawer, LineDrawer, RectangleDrawer } from '../../drawers';
import { ArrowDrawer } from '../../drawers/arrow-drawer';
import { OvalDrawer } from '../../drawers/oval-drawer';
import { PolyLineDrawer } from '../../drawers/polyline-drawer';
import { SvgDrawer } from '../../drawers/svg-drawer';
import { TextDrawer } from '../../drawers/text-drawer';
import { TriangleDrawer } from '../../drawers/triangle-drawer';
import { LineArrow } from '../../fabricjs/line-arrow';
import { TriangleArrow } from '../../fabricjs/triangle-arrow';
import { DrawerColor } from '../../models/drawer-color';
import { IconHelperService } from '../../services/icon-helper.service';

@Component({
  selector: 'strat-editor-drawing-editor',
  templateUrl: './drawing-editor.component.html',
  styleUrls: ['./drawing-editor.component.scss'],
})
export class DrawingEditorComponent implements OnInit {
  @Input() canvasWidth: number;
  @Input() canvasHeight: number;
  @Output() stateModified = new EventEmitter<string>();
  @Output() stateLoaded = new EventEmitter<void>();
  private cursorMode: CursorMode;

  private canvas: fabric.Canvas;

  private drawer: ObjectDrawer; // Current drawer

  private avalaibleDrawers: Map<string, ObjectDrawer>;

  private drawerOptions: fabric.IObjectOptions; // Current drawer options

  private object: fabric.Object; // The object currently being drawn

  private isDown: boolean; //Is user dragging the mouse?

  private cursorSvg: fabric.Image;

  private mouseIsIn: boolean;

  constructor(private ihs: IconHelperService) {
    this.setBackgroundImageFromUrl.bind(this);
    this.addAvalaibleDrawers();
  }

  ngOnInit(): void {
    this.isDown = false;
    // user is drawing
    this.cursorMode = CursorMode.Undefined;
    // Create the Fabric canvas
    this.canvas = new fabric.Canvas('canvas', { selection: false });
    this.canvas.setWidth(this.canvasWidth);
    this.canvas.setHeight(this.canvasHeight);

    // Set the default options for the "drawer" class, including stroke color, width, and style
    this.drawerOptions = {
      name: 'line',
      strokeWidth: 5,
      selectable: true,
      strokeUniform: true,
    };
    this.initializeCanvasEvents();
  }

  private addAvalaibleDrawers() {
    this.avalaibleDrawers = new Map<string, ObjectDrawer>();
    this.avalaibleDrawers.set('line', new LineDrawer());
    this.avalaibleDrawers.set('arrow', new ArrowDrawer());
    this.avalaibleDrawers.set('triangle', new TriangleDrawer());
    this.avalaibleDrawers.set('rectangle', new RectangleDrawer());
    this.avalaibleDrawers.set('oval', new OvalDrawer());
    this.avalaibleDrawers.set('text', new TextDrawer());
    this.avalaibleDrawers.set('polyline', new PolyLineDrawer());
    this.avalaibleDrawers.set('star', new SvgDrawer('star', this.ihs));
    this.avalaibleDrawers.set('time', new SvgDrawer('time', this.ihs));
    this.avalaibleDrawers.set('location', new SvgDrawer('location', this.ihs));
  }

  public setColor(color: DrawerColor) {
    this.drawerOptions.stroke = DrawerColor.rgba(color);
    this.drawerOptions.fill = DrawerColor.rgba(color);
  }

  public setDrawerByAction(action: DrawerAction) {
    if (action) {
      this.cursorMode = CursorMode.Draw;
      this.drawer = this.avalaibleDrawers.get(action.name);
    }
  }

  public setDrawerOptions(action: DrawerAction) {
    if (action) {
      action.drawerOptions.forEach((option) => {
        Object.defineProperties(this.drawerOptions, {
          [option.optionName]: {
            value: action.active ? option.optionValue : option.initialValue,
            writable: false,
            configurable: true,
          },
        });
      });
    }
  }

  public setFontFamily(font: string) {
    Object.defineProperties(this.drawerOptions, {
      ['fontFamily']: {
        value: font,
        writable: false,
        configurable: true,
      },
    });
    this.canvas.renderAll();
  }

  public setFontSize(fontSize: number) {
    Object.defineProperties(this.drawerOptions, {
      ['fontSize']: {
        value: fontSize,
        writable: true,
        configurable: true,
      },
    });
    this.canvas.renderAll();
  }
  public deleteActiveObject() {
    this.canvas.getActiveObjects().forEach((obj) => {
      this.canvas.remove(obj);
    });
    this.canvas.setActiveObject(null);
    this.stateModified.emit(this.getCanvasState());
    this.canvas.renderAll();
  }

  public selectAllObjects() {
    var selection = new fabric.ActiveSelection(this.canvas.getObjects(), {
      canvas: this.canvas,
    });
    this.canvas.setActiveObject(selection);
    this.canvas.renderAll();
  }

  public getCanvasState(): string {
    return this.canvas.toDatalessJSON();
  }

  public setCanvasState(canvasState: string): void {
    this.canvas.loadFromJSON(canvasState, this.canvasStateIsLoaded);
  }

  public setBackgroundImageFromUrl = (imageUrl: string) => {
    fabric.Image.fromURL(imageUrl, this.setBackground);
  };

  private canvasStateIsLoaded = (): void => {
    this.stateLoaded.emit();
  };

  private initializeCanvasEvents() {
    this.canvas.on('mouse:out', () => {});

    this.canvas.on('mouse:down', (o) => {
      const pointer = this.canvas.getPointer(o.e);
      this.mouseDown(pointer.x, pointer.y);
    });

    this.canvas.on('mouse:move', (event: fabric.IEvent) => {
      const pointer = this.canvas.getPointer(event.e);
      this.mouseMove(pointer.x, pointer.y);
    });

    this.canvas.on('mouse:up', () => {
      this.mouseUp();
    });

    this.canvas.on('selection:created', (event: fabric.IEvent) => {
      this.selectionCreated(event);
    });

    this.canvas.on('selection:cleared', () => {
      this.cursorMode = CursorMode.Draw;
    });

    this.canvas.on('object:scaling', () => {
      this.cursorMode = CursorMode.Select;
    });
  }

  private selectionCreated(event: fabric.IEvent) {
    this.cursorMode = CursorMode.Select;
    this.object = event.target;
    if (event.target instanceof LineArrow) {
      var selection = new fabric.ActiveSelection(
        [event.target, event.target.triangle],
        {
          canvas: this.canvas,
        }
      );
      this.canvas.setActiveObject(selection);
    } else if (event.target instanceof TriangleArrow) {
      var selection = new fabric.ActiveSelection(
        [event.target, event.target.line],
        {
          canvas: this.canvas,
        }
      );
      this.canvas.setActiveObject(selection);
    } else {
      this.canvas.setActiveObject(this.object);
    }
  }
  private async mouseUp() {
    this.isDown = false;
    this.stateModified.emit(this.getCanvasState());
  }

  private async mouseDown(x: number, y: number): Promise<void> {
    this.isDown = true; //The mouse is being clicked

    if (this.cursorMode !== CursorMode.Draw) {
      return;
    }
    // Create an object at the point (x,y)
    this.object = await this.make(x, y);

    if (this.object instanceof LineArrow && this.object.triangle) {
      this.canvas.add(this.object.triangle);
    }
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
    this.mouseIsIn = true;
  }

  // Method which allows any drawer to Promise their make() function
  private async make(x: number, y: number): Promise<fabric.Object> {
    if (this.drawer) {
      return await this.drawer.make(x, y, this.drawerOptions);
    }
  }

  private setBackground = (img: fabric.Image): void => {
    if (this.canvas.width < this.canvas.height) {
      const scaleX = this.canvas.width / img.width;
      this.canvas.setBackgroundImage(
        img,
        this.canvas.renderAll.bind(this.canvas),
        {
          scaleX: scaleX,
          scaleY: scaleX,
          top: this.canvas.getCenter().top,
          left: this.canvas.getCenter().left,
          originX: 'center',
          originY: 'center',
        }
      );
    } else {
      const scaleY = this.canvas.height / img.height;
      this.canvas.setBackgroundImage(
        img,
        this.canvas.renderAll.bind(this.canvas),
        {
          scaleX: scaleY,
          scaleY: scaleY,
          top: this.canvas.getCenter().top,
          left: this.canvas.getCenter().left,
          originX: 'center',
          originY: 'center',
        }
      );
    }
    this.stateModified.emit(this.getCanvasState());
  };

  public resize(screenWidth: number, canvasHeight: number) {
    this.canvas.setWidth(screenWidth);
    this.canvas.setHeight(canvasHeight);
  }

  public updatePointerIcon(iconUrl: string) {
    // this.canvas.freeDrawingCursor = "pointer";
    // this.canvas.hoverCursor = `url('/${iconUrl}') x y, auto`;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    // const that = this;
    // fabric.Image.fromURL(iconUrl, function(image) {
    //   image.scaleToWidth(15,false);
    //   that.canvas.add(image);
    // }, {crossOrigin: "anonymous"});
  }
}
