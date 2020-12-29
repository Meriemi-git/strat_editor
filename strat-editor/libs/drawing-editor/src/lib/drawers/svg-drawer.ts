import { fabric } from 'fabric';
import { ObjectDrawer } from './object-drawer';
import { DrawingMode } from './drawing-mode';
import { Injectable } from '@angular/core';
import { IconHelperService } from '../services/icon-helper.service';

@Injectable()
export class SvgDrawer implements ObjectDrawer {
  drawingMode: DrawingMode = DrawingMode.Svg;
  private svgName: string;
  origX: number;
  origY: number;
  constructor(svgName: string, private ihs: IconHelperService) {
    this.svgName = svgName;
  }

  make(
    x: number,
    y: number,
    drawerOptions: fabric.IObjectOptions,
    x2?: number,
    y2?: number
  ): Promise<fabric.Object> {
    return new Promise<fabric.Object>((resolve) => {
      (this.origX = x), (this.origY = y);
      fabric.loadSVGFromURL(this.ihs.getSvgIconByName(this.svgName), function (
        objects,
        options
      ) {
        let shape = fabric.util.groupSVGElements(objects, options);
        shape.set({
          ...drawerOptions,
          left: x - shape.width,
          top: y - shape.height,
          scaleX: 2,
          scaleY: 2,
          selectable: false,
        });
        resolve(shape);
      });
    });
  }

  resize(shape: fabric.Object, x: number, y: number): Promise<fabric.Object> {
    return new Promise<fabric.Object>((resolve) => {
      resolve(shape);
    });
  }

  getDistance(x1, y1, x2, y2): number {
    var dx = x1 - x2;
    var dy = y1 - y2;
    var dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    return dist;
  }
}
