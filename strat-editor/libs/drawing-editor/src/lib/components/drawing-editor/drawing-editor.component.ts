import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Agent, DrawingError, Image } from '@strat-editor/data';
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
import { DrawerActionType } from '../../models';
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

  private drawer: ObjectDrawer;

  private avalaibleDrawers: Map<string, ObjectDrawer>;

  private drawerOptions: fabric.IObjectOptions;
  private object: fabric.Object;

  private isDown: boolean;
  private isMoving: boolean;

  private editingText: boolean;
  private selectedObjects: fabric.Object[] = [];

  private lastPosX: number = 0;
  private lastPosY: number = 0;

  constructor(private ihs: IconHelperService) {
    this.addAvalaibleDrawers();
  }

  ngOnInit(): void {
    this.isDown = false;
    this.cursorMode = CursorMode.Undefined;
    this.canvas = new fabric.Canvas('canvas', {
      selection: false,
    });
    this.canvas.setWidth(this.canvasWidth);
    this.canvas.setHeight(this.canvasHeight);

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

  public drawAgent(agent: Agent, x, y) {
    if (agent) {
      fabric.Image.fromURL(
        this.ihs.getAgentImageByName(agent.badge),
        function (image) {
          const div = 50 / image.width;
          image.set({
            left: x,
            top: y,
            scaleX: div,
            scaleY: div,
          });
          this.canvas.add(image);
          this.canvas.renderAll();
        }.bind(this)
      );
    }
  }

  public clear() {
    console.log('clear canvas');
    this.canvas.clear();
  }

  public drawImage(draggingImage: Image, x: any, y: any) {
    if (draggingImage) {
      fabric.Image.fromURL(
        this.ihs.getImageByName(draggingImage.fileName),
        function (image) {
          const div = 50 / image.width;
          image.set({
            left: x,
            top: y,
            scaleX: div,
            scaleY: div,
          });
          this.canvas.add(image);
          this.canvas.renderAll();
        }.bind(this)
      );
    }
  }

  public callAction(action: DrawerAction) {
    if (action) {
      this.dispatchActionByType(action);
    } else {
      this.drawer = null;
      this.cursorMode = CursorMode.Selection;
    }
  }

  private dispatchActionByType(action: DrawerAction) {
    switch (action.type) {
      case DrawerActionType.SHAPE:
      case DrawerActionType.TEXT:
      case DrawerActionType.FORM:
        this.canvas.forEachObject((object) => (object.selectable = false));
        this.cursorMode = CursorMode.Draw;
        this.drawer = this.avalaibleDrawers.get(action.name);
        break;
      case DrawerActionType.TOOL:
        this.manageToolsActions(action);
        break;
      default:
        console.log('Action type not managed');
    }
  }

  private manageToolsActions(action: DrawerAction) {
    switch (action.name) {
      case 'selection':
        this.cursorMode = CursorMode.Selection;
        this.drawer = null;
        this.canvas.forEachObject(
          (object) => (object.selectable = object.name !== 'map')
        );
        break;
      case 'dragging':
        this.cursorMode = CursorMode.Dragging;
        this.drawer = null;
        break;
      default:
        console.log('Tool action name not managed :', action.name);
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
      if (obj.name != 'map') {
        this.canvas.remove(obj);
      }
    });
    this.canvas.discardActiveObject();
    this.stateModified.emit(this.getCanvasState());
    this.canvas.renderAll();
  }

  public selectAllObjects() {
    var selection = new fabric.ActiveSelection(
      this.canvas.getObjects().filter((obj) => obj.name !== 'map'),
      {
        canvas: this.canvas,
      }
    );
    this.canvas.setActiveObject(selection);
    this.canvas.renderAll();
  }

  public getCanvasState(): string {
    this.updateNestedObjects();
    return this.canvas.toJSON(['line', 'triangle', 'type', 'uid', 'name']);
  }

  public setCanvasState(canvasState: string): void {
    this.canvas.loadFromJSON(canvasState, this.canvasStateIsLoaded);
  }

  public setBackgroundImageFromUrl(imageUrl: string): any {
    fabric.Image.fromURL(
      imageUrl,
      function (image) {
        if (image._element) {
          const scale =
            this.canvas.width < this.canvas.height
              ? this.canvas.width / image.width
              : this.canvas.height / image.height;
          image.set({
            top: this.canvas.getCenter().top,
            left: this.canvas.getCenter().left,
            originX: 'center',
            originY: 'center',
            scaleX: scale,
            scaleY: scale,
            selectable: false,
            name: 'map',
          });
          this.canvas.add(image);
          this.canvas.renderAll();
          this.stateModified.emit(this.getCanvasState());
        } else {
          throw new DrawingError('Cannot load backgroung image');
        }
      }.bind(this)
    );
  }

  private canvasStateIsLoaded = (): void => {
    this.updateNestedObjects();
    this.stateLoaded.emit();
  };

  updateNestedObjects() {
    this.canvas._objects.forEach((object) => {
      let triangleArrow = (object as LineArrow).triangle;
      let lineArrow = (object as TriangleArrow).line;
      if (triangleArrow) {
        (object as LineArrow).triangle = this.getFabricObjectByUidAndType(
          (object as LineArrow).uid,
          'TriangleArrow'
        );
      } else if (lineArrow) {
        (object as TriangleArrow).line = this.getFabricObjectByUidAndType(
          (object as TriangleArrow).uid,
          'LineArrow'
        );
      }
    });
  }

  getFabricObjectByUidAndType(uid: string, type: string): any {
    return this.canvas._objects.find(
      (object) => (object as any).uid === uid && (object as any).name === type
    );
  }

  private initializeCanvasEvents() {
    this.canvas.on('mouse:down', (event: fabric.IEvent) => {
      this.mouseDown(event);
    });

    this.canvas.on('mouse:move', (event: fabric.IEvent) => {
      this.mouseMove(event);
    });

    this.canvas.on('mouse:up', (event: fabric.IEvent) => {
      this.mouseUp(event);
    });

    this.canvas.on('object:moving', () => {
      this.isMoving = true;
    });

    this.canvas.on('selection:created', (event: fabric.IEvent) => {
      this.selectionCreated(event);
    });

    this.canvas.on('object:scaling', () => {
      this.cursorMode = CursorMode.Selection;
    });

    this.canvas.on('object:modified', (event: fabric.IEvent) => {
      if (event.target instanceof fabric.Textbox) {
        this.editingText = true;
        this.cursorMode = CursorMode.Draw;
      }
    });

    this.canvas.on('mouse:wheel', (event: fabric.IEvent) => {
      this.onMouseWheel(event);
    });
  }

  private async mouseDown(event: fabric.IEvent): Promise<void> {
    const pointer = this.canvas.getPointer(event.e);
    this.lastPosX = (event.e as any).clientX;
    this.lastPosY = (event.e as any).clientY;
    this.selectedObjects = this.canvas.getActiveObjects();
    this.isDown = true;
    if (
      this.cursorMode !== CursorMode.Draw ||
      this.editingText ||
      this.selectedObjects.length > 0
    ) {
      this.editingText = false;
      return;
    }
    this.object = await this.make(pointer.x, pointer.y);
    if (this.object instanceof LineArrow && this.object.triangle) {
      this.canvas.add(this.object.triangle);
    }
    this.canvas.add(this.object);
    this.canvas.renderAll();
  }

  private mouseMove(event: fabric.IEvent): void {
    const pointer = this.canvas.getPointer(event.e);
    if (this.cursorMode === CursorMode.Draw && this.isDown) {
      this.drawer.resize(this.object, pointer.x, pointer.y);
      this.canvas.renderAll();
    } else if (this.cursorMode === CursorMode.Dragging && this.isDown) {
      let vpt = this.canvas.viewportTransform;

      vpt[4] += (event.e as any).clientX - this.lastPosX;
      vpt[5] += (event.e as any).clientY - this.lastPosY;
      this.lastPosX = (event.e as any).clientX;
      this.lastPosY = (event.e as any).clientY;
      this.canvas.renderAll();
    }
  }

  private async mouseUp(event: fabric.IEvent) {
    if (this.isMoving) {
      this.canvas.discardActiveObject();
    }
    this.isDown = false;
    this.isMoving = false;
    this.canvas.setViewportTransform(this.canvas.viewportTransform);
    this.canvas.renderAll();
    this.stateModified.emit(this.getCanvasState());
  }

  private selectionCreated(event: fabric.IEvent) {
    this.cursorMode = CursorMode.Selection;
    this.object = event.target;
    let selection: fabric.ActiveSelection;
    if ((event.target as LineArrow).triangle) {
      selection = new fabric.ActiveSelection(
        [event.target, (event.target as LineArrow).triangle],
        {
          canvas: this.canvas,
        }
      );
    } else if ((event.target as TriangleArrow).line) {
      selection = new fabric.ActiveSelection(
        [event.target, (event.target as TriangleArrow).line],
        {
          canvas: this.canvas,
        }
      );
    }
    if (selection) {
      this.canvas.setActiveObject(selection);
    } else {
      this.canvas.setActiveObject(this.object);
    }
    this.canvas.renderAll();
  }

  private onMouseWheel(event: fabric.IEvent) {
    var delta = (event.e as any).deltaY;
    var zoom = this.canvas.getZoom();
    zoom *= 0.9 ** delta;
    if (zoom > 10) zoom = 10;
    if (zoom < 0.3) zoom = 0.3;
    let pointToZoom = new fabric.Point(
      (event.e as any).offsetX,
      (event.e as any).offsetY
    );
    this.canvas.zoomToPoint(pointToZoom, zoom);
    event.e.preventDefault();
    event.e.stopPropagation();
  }

  private async make(x: number, y: number): Promise<fabric.Object> {
    if (this.drawer) {
      return await this.drawer.make(x, y, this.drawerOptions);
    }
  }

  public resize(screenWidth: number, canvasHeight: number) {
    this.canvas.setWidth(screenWidth);
    this.canvas.setHeight(canvasHeight);
  }

  public resetView() {
    this.canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
  }
}
