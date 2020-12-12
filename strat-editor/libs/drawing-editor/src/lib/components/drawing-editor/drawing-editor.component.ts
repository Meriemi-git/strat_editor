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
import { Color } from '../../models/color';
import { IconHelperService } from '../../services/icon-helper.service';

@Component({
  selector: 'strat-editor-drawing-editor',
  templateUrl: './drawing-editor.component.html',
  styleUrls: ['./drawing-editor.component.scss'],
})
export class DrawingEditorComponent implements OnInit {
  @Input() canvasWidth: number;
  @Input() canvasHeight: number;
  @Output() objectDrawn = new EventEmitter<fabric.Object>();
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

  addAvalaibleDrawers() {
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

  setColor(color: Color) {
    this.drawerOptions.stroke = Color.rgba(color);
  }

  public setDrawerByAction(action: DrawerAction) {
    if (action) {
      this.cursorMode = CursorMode.Draw;
      this.drawer = this.avalaibleDrawers.get(action.name);
      Object.assign(this.drawerOptions, action);
    }
  }

  private initializeCanvasEvents() {
    this.canvas.on('mouse:out', (o) => {});

    this.canvas.on('mouse:down', (o) => {
      const pointer = this.canvas.getPointer(o.e);
      this.mouseDown(pointer.x, pointer.y);
    });

    this.canvas.on('mouse:move', (event: fabric.IEvent) => {
      const pointer = this.canvas.getPointer(event.e);
      this.mouseMove(pointer.x, pointer.y);
    });

    this.canvas.on('mouse:up', (event: fabric.IEvent) => {
      this.isDown = false;
      this.objectDrawn.emit(this.object);
    });

    this.canvas.on('selection:created', (o) => {
      this.cursorMode = CursorMode.Select;
      this.object = o.target;
      if (o.target instanceof LineArrow) {
        var selection = new fabric.ActiveSelection(
          [o.target, o.target.triangle],
          {
            canvas: this.canvas,
          }
        );
        this.canvas.setActiveObject(selection);
      } else if (o.target instanceof TriangleArrow) {
        var selection = new fabric.ActiveSelection([o.target, o.target.line], {
          canvas: this.canvas,
        });
        this.canvas.setActiveObject(selection);
      } else {
        this.canvas.setActiveObject(this.object);
      }
    });

    this.canvas.on('selection:cleared', () => {
      this.cursorMode = CursorMode.Draw;
    });

    this.canvas.on('object:scaling', (event: fabric.IEvent) => {
      this.cursorMode = CursorMode.Select;
    });
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

  public setBackgroundImageFromUrl = (imageUrl: string) => {
    fabric.Image.fromURL(imageUrl, this.setBackground);
  };

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
  };

  resize(screenWidth: number, canvasHeight: number) {
    this.canvas.setWidth(screenWidth);
    this.canvas.setHeight(canvasHeight);
  }

  updatePointerIcon(iconUrl: string) {
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
