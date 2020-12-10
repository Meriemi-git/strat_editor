import { fabric } from 'fabric';
import { ObjectDrawer } from './object-drawer';
import { DrawingMode } from './drawing-mode';
import { Injectable } from '@angular/core';
import { IconHelperService } from '../services/icon-helper.service';

@Injectable()
export class SvgDrawer implements ObjectDrawer {
  drawingMode: DrawingMode = DrawingMode.Svg;
  private svgName: string;
  constructor(svgName: string, private ihs: IconHelperService) {
    this.svgName = svgName;
  }

  make(
    x: number,
    y: number,
    options: fabric.IObjectOptions,
    x2?: number,
    y2?: number
  ): Promise<fabric.Image> {
    // Return a Promise that will draw a line
    return new Promise<fabric.Image>((resolve) => {
      fabric.Image.fromURL(this.ihs.getSvgIconByName(this.svgName), function (
        image
      ) {
        image.set({
          top: y - image.height / 2,
          left: x - image.width / 2,
          scaleX: 2,
          scaleY: 2,
        });
        // scale image down, and flip it, before adding it onto canvas
        resolve(image);
      });
    });
  }

  resize(image: fabric.Image, x: number, y: number): Promise<fabric.Image> {
    return new Promise<fabric.Image>((resolve) => {
      resolve(image);
    });
  }

  scale = (event: fabric.IEvent): Promise<fabric.Object> => {
    return new Promise<fabric.Object>((resolve) => {
      resolve(event.target);
    });
  };

  getDistance(x1, y1, x2, y2): number {
    var dx = x1 - x2;
    var dy = y1 - y2;
    var dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    return dist;
  }
}
