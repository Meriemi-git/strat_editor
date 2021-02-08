import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import {
  Agent,
  MapLoadingError,
  Image,
  Floor,
  DrawingMode,
  DrawerColor,
  DrawerAction,
  Map as _Map,
  KEY_CODE,
  Strat,
  Layer,
  StratAction,
} from '@strat-editor/data';
import { Store } from '@ngrx/store';
import * as StratStore from '@strat-editor/store';

import { fabric } from 'fabric';
import { ObjectDrawer, LineDrawer, RectangleDrawer } from '../drawers';
import { ArrowDrawer } from '../drawers/arrow-drawer';
import { OvalDrawer } from '../drawers/oval-drawer';
import { PolyLineDrawer } from '../drawers/polyline-drawer';
import { SvgDrawer } from '../drawers/svg-drawer';
import { TextDrawer } from '../drawers/text-drawer';
import { TriangleDrawer } from '../drawers/triangle-drawer';
import { LineArrow } from '../fabricjs/line-arrow';
import { TriangleArrow } from '../fabricjs/triangle-arrow';
import { ImageHelperService } from '../services/image-helper.service';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'strat-editor-drawing-editor',
  templateUrl: './drawing-editor.component.html',
  styleUrls: ['./drawing-editor.component.scss'],
})
export class DrawingEditorComponent implements OnInit {
  @Input() canvasWidth: number;
  @Input() canvasHeight: number;

  public drawingMode: DrawingMode;

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

  private draggingAgent: Agent;
  private draggingImage: Image;
  private CTRLPressed: boolean;
  private canvasLoading: boolean;

  constructor(
    private cdr: ChangeDetectorRef,
    private ihs: ImageHelperService,
    private store: Store<StratStore.StratEditorState>
  ) {
    this.addAvalaibleDrawers();
  }

  ngOnInit(): void {
    this.initCanvas();
    this.initializeCanvasEvents();
    this.resize(window.innerWidth, window.innerHeight - 60);
    this.store.select(StratStore.getColor).subscribe((color) => {
      this.setColor(color);
    });
    this.store.select(StratStore.getSelectedOption).subscribe((option) => {
      this.setDrawerOptions(option);
    });
    this.store.select(StratStore.getFontFamily).subscribe((fontFamily) => {
      this.setFontFamily(fontFamily);
    });
    this.store.select(StratStore.getFontSize).subscribe((fontSize) => {
      this.setFontSize(fontSize);
    });

    this.store.select(StratStore.getSelectedAction).subscribe((selected) => {
      this.doAction(selected);
    });

    this.store.select(StratStore.getDrawingMode).subscribe((drawingMode) => {
      this.manageDrawingMode(drawingMode);
    });

    this.store.select(StratStore.getDraggedAgent).subscribe((agent) => {
      if (agent) {
        this.draggingAgent = agent;
      }
    });

    this.store.select(StratStore.getDraggedImage).subscribe((image) => {
      if (image) {
        this.draggingImage = image;
      }
    });

    this.store.select(StratStore.getCanvas).subscribe((canvas) => {
      this.loadCanvas(canvas);
    });

    this.store.select(StratStore.getCurrentLayer).subscribe((layer) => {
      if (layer) {
        this.clear();
        if (layer.canvasState) {
          this.loadCanvas(layer.canvasState);
        } else {
          this.store
            .select(StratStore.getFloorById, layer.floorId)
            .subscribe((floor) => {
              this.setFloorImage(floor);
            });
        }
      }
    });
  }

  private loadCanvas(canvasState: string): void {
    if (canvasState) {
      const state = JSON.parse(canvasState);
      this.setCanvasState(state);
    }
  }

  private manageDrawingMode(newDrawingMode: DrawingMode) {
    if (this.drawingMode != newDrawingMode) {
      switch (newDrawingMode) {
        case DrawingMode.Selection:
          this.enableSelectionMode();
          break;
        case DrawingMode.Dragging:
          this.enableDraggingMode();
          break;
        case DrawingMode.Drawing:
          this.enableDrawingMode();
          break;
        default:
      }
    }
  }

  private initCanvas() {
    this.isDown = false;
    this.drawingMode = DrawingMode.Undefined;
    this.canvas = new fabric.Canvas('canvas', {
      selection: false,
      preserveObjectStacking: true,
    });
    this.canvas.setWidth(this.canvasWidth);
    this.canvas.setHeight(this.canvasHeight);

    this.drawerOptions = {
      name: 'line',
      strokeWidth: 5,
      selectable: true,
      strokeUniform: true,
    };
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

  public drawImage(draggingImage: Image, x: any, y: any) {
    if (draggingImage) {
      fabric.Image.fromURL(
        this.ihs.getGalleryImageByName(draggingImage.fileName),
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

  public doAction(action: DrawerAction) {
    if (action) {
      this.drawer = this.avalaibleDrawers.get(action.name);
      this.enableDrawingMode();
    } else {
      this.enableSelectionMode();
    }
  }

  private enableSelectionMode() {
    this.canvas.hoverCursor = 'grab';
    this.canvas.moveCursor = 'grabbing';

    this.canvas.forEachObject((object) => {
      object.selectable = object.name !== 'map';
    });
    this.drawingMode = DrawingMode.Selection;
    this.store.dispatch(
      StratStore.SetDrawingMode({ drawingMode: this.drawingMode })
    );
  }

  private enableDraggingMode() {
    this.canvas.hoverCursor = 'move';
    this.canvas.moveCursor = 'move';

    this.canvas.forEachObject((object) => (object.selectable = false));
    this.drawingMode = DrawingMode.Dragging;
    this.store.dispatch(
      StratStore.SetDrawingMode({ drawingMode: this.drawingMode })
    );
  }

  private enableDrawingMode() {
    this.canvas.hoverCursor = 'crosshair';
    this.canvas.moveCursor = 'crosshair';
    this.canvas.forEachObject((object) => (object.selectable = false));
    this.drawingMode = DrawingMode.Drawing;
    this.store.dispatch(
      StratStore.SetDrawingMode({ drawingMode: this.drawingMode })
    );
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
    this.canvas.renderAll();
    const canvas = JSON.stringify(this.getCanvasState());
    console.log('d Dispatch SaveCanvasState');
    this.store.dispatch(StratStore.SaveCanvas({ canvas: canvas }));
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
    return this.canvas.toJSON([
      'line',
      'triangle',
      'type',
      'uid',
      'name',
      'selectable',
    ]);
  }

  public setCanvasState(canvasState: string): void {
    console.log('loadFromJSON', canvasState);
    this.canvas.loadFromJSON(
      canvasState,
      this.canvasStateIsLoaded,
      (o, object: fabric.Object) => {
        if (object.name === 'map') {
          console.log('reviver', object);
        }
      }
    );
    this.canvas.renderAll();
  }

  public setFloorImage(floor: Floor): any {
    console.log('setFloorImage', floor);
    fabric.Image.fromURL(
      this.ihs.getFloorImage(floor),
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
          }).setCoords;
          this.canvas.add(image);
          this.canvas.renderAll();
          const canvasState = JSON.stringify(this.getCanvasState());
          console.log('d Dispatch SaveCanvasState');
          this.store.dispatch(StratStore.SaveCanvas({ canvas: canvasState }));
        } else {
          throw new MapLoadingError(
            'Cannot load backgroung image for ' + floor.name
          );
        }
      }.bind(this)
    );
  }

  private canvasStateIsLoaded = (): void => {
    this.updateNestedObjects();
    this.canvasLoading = false;
  };

  private updateNestedObjects() {
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

  private getFabricObjectByUidAndType(uid: string, type: string): any {
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
      if (this.drawingMode == DrawingMode.Selection) {
        this.selectionCreated(event);
      }
    });

    this.canvas.on('object:modified', (event: fabric.IEvent) => {
      if (event.target instanceof fabric.Textbox) {
        console.log('Drawwing-Editor object:modified');
        this.editingText = true;
        this.drawingMode = DrawingMode.Drawing;
        this.store.dispatch(
          StratStore.SetDrawingMode({ drawingMode: this.drawingMode })
        );
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
    this.selectedObjects = this.canvas
      .getActiveObjects()
      .filter((object) => object.name !== 'map');
    this.isDown = true;
    if (
      this.drawingMode !== DrawingMode.Drawing ||
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

  private async mouseMove(event: fabric.IEvent): Promise<void> {
    const pointer = this.canvas.getPointer(event.e);
    if (this.drawingMode === DrawingMode.Drawing && this.isDown) {
      this.drawer.resize(this.object, pointer.x, pointer.y);
      this.canvas.renderAll();
    } else if (this.drawingMode === DrawingMode.Dragging && this.isDown) {
      let vpt = this.canvas.viewportTransform;

      vpt[4] += (event.e as any).clientX - this.lastPosX;
      vpt[5] += (event.e as any).clientY - this.lastPosY;
      this.lastPosX = (event.e as any).clientX;
      this.lastPosY = (event.e as any).clientY;
      this.canvas.renderAll();
    }
  }

  private async mouseUp(event: fabric.IEvent): Promise<void> {
    if (this.isMoving) {
      this.canvas.discardActiveObject();
    }
    this.isDown = false;
    this.isMoving = false;
    this.canvas.setViewportTransform(this.canvas.viewportTransform);
    this.canvas.renderAll();
    const canvasState = JSON.stringify(this.getCanvasState());
    this.store.dispatch(
      StratStore.SaveCanvas({
        canvas: canvasState,
      })
    );
  }

  private selectionCreated(event: fabric.IEvent) {
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
    } else if (this.object.name !== 'map') {
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

  private resizeAllObjects(newWidth) {
    if (this.canvas.width != newWidth) {
      var scaleMultiplier = newWidth / this.canvas.width;
      var objects = this.canvas.getObjects();
      for (var i in objects) {
        objects[i].scaleX = objects[i].scaleX * scaleMultiplier;
        objects[i].scaleY = objects[i].scaleY * scaleMultiplier;
        objects[i].left = objects[i].left * scaleMultiplier;
        objects[i].top = objects[i].top * scaleMultiplier;
        objects[i].setCoords();
      }
      this.canvas.discardActiveObject();
      this.canvas.renderAll();
      this.canvas.calcOffset();
    }
  }

  private resize(width: number, height: number) {
    this.resizeAllObjects(width);
    this.canvas.setWidth(width);
    this.canvas.setHeight(height);
  }

  public resetView() {
    this.canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
  }

  public close() {
    this.clear();
    this.resize(0, 0);
  }

  public clear() {
    this.canvas.clear();
    this.canvas.renderAll();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.resize(window.innerWidth, window.innerHeight - 60);
  }

  @HostListener('dragstart', ['$event'])
  onWindowDragStart(event: any) {
    this.cdr.detach();
  }

  @HostListener('dragend', ['$event'])
  onWindowDragEnd(event: any) {
    this.cdr.reattach();
  }

  @HostListener('drop', ['$event'])
  onwindowDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (this.draggingAgent) {
      this.drawAgent(this.draggingAgent, event.layerX, event.layerY);
      this.draggingAgent = null;
    }
    if (this.draggingImage) {
      this.drawImage(this.draggingImage, event.layerX, event.layerY);
      this.draggingImage = null;
    }
  }

  @HostListener('document:keyup', ['$event'])
  keyUp(event: KeyboardEvent) {
    switch (event.key.toLocaleLowerCase()) {
      case KEY_CODE.DELETE:
        this.deleteActiveObject();
        break;
      case KEY_CODE.ESCAPE:
        this.resetView();
        break;
      case KEY_CODE.A:
        if (this.CTRLPressed) {
          this.selectAllObjects();
          if (window.getSelection) {
            if (window.getSelection().empty) {
              window.getSelection().empty();
            } else if (window.getSelection().removeAllRanges) {
              window.getSelection().removeAllRanges();
            }
          }
        }
        break;
      case KEY_CODE.Z:
        if (this.CTRLPressed && !this.canvasLoading) {
          this.store.dispatch(StratStore.UndoCanvasState());
        }
        break;
      case KEY_CODE.Y:
        if (this.CTRLPressed && !this.canvasLoading) {
          this.store.dispatch(StratStore.RedoCanvasState());
        }
        break;
      case KEY_CODE.CTRL:
        this.CTRLPressed = false;
        break;
      default:
    }
  }

  @HostListener('document:keydown', ['$event'])
  keyDown(event: KeyboardEvent) {
    switch (event.key.toLocaleLowerCase()) {
      case KEY_CODE.CTRL:
        this.CTRLPressed = true;
        break;
    }
  }
}
