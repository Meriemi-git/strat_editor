import { fabric } from 'fabric';
import { ObjectDrawer } from './object-drawer';
import { DrawingMode } from './drawing-mode';


export class ArrowDrawer implements ObjectDrawer {
  private origX: number;
  private origY: number;
  private previousY: number;
  private previousX: number;
  drawingMode: DrawingMode = DrawingMode.Line;

  make(x: number, y: number, options: fabric.IObjectOptions, x2?: number, y2?: number): Promise<fabric.Polyline> {
    this.origX = x;
    this.origY = y;
    this.previousY =0;
    this.previousX =0;
      // Return a Promise that will draw a line
      return new Promise<fabric.Polyline>(resolve => {
          // Inside the Promise, draw the actual line from (x,y) to (x2,y2)
          resolve(this.createArrow(x,y,options,x2,y2));
      });
  }

  createArrow(x: number, y: number, options: fabric.IObjectOptions, x2?: number, y2?: number): fabric.Polyline {

    var angle = Math.atan2(x -  this.origY, y - this.origX);

    var headlen = 15;  // arrow head size

    // bring the line end back some to account for arrow head.
    x = x - (headlen) * Math.cos(angle);
    y = x - (headlen) * Math.sin(angle);

    var points = [
      {
        x: this.origX,  // start point
        y: this.origY
      }, {
        x: this.origX - (headlen / 4) * Math.cos(angle - Math.PI / 2),
        y: this.origY - (headlen / 4) * Math.sin(angle - Math.PI / 2)
      },{
        x: x - (headlen / 4) * Math.cos(angle - Math.PI / 2),
        y: y - (headlen / 4) * Math.sin(angle - Math.PI / 2)
      }, {
        x: x - (headlen) * Math.cos(angle - Math.PI / 2),
        y: y - (headlen) * Math.sin(angle - Math.PI / 2)
      },{
        x: x + (headlen) * Math.cos(angle),  // tip
        y: y + (headlen) * Math.sin(angle)
      }, {
        x: x - (headlen) * Math.cos(angle + Math.PI / 2),
        y: y - (headlen) * Math.sin(angle + Math.PI / 2)
      }, {
        x: x - (headlen / 4) * Math.cos(angle + Math.PI / 2),
        y: y - (headlen / 4) * Math.sin(angle + Math.PI / 2)
      }, {
        x: this.origX - (headlen / 4) * Math.cos(angle + Math.PI / 2),
        y: this.origY - (headlen / 4) * Math.sin(angle + Math.PI / 2)
      },{
        x: this.origX,
        y: this.origY
      }
    ];

    var pline = new fabric.Polyline(points, {
      fill: 'white',
      stroke: 'black',
      opacity: 1,
      strokeWidth: 2,
      originX: 'left',
      originY: 'top',
      selectable: true
    });
    return pline;
  }



  resize(group: fabric.Group, x: number, y: number): Promise<fabric.Object> {
      let angle = this.calcArrowAngle(this.origX,this.origY,x,y);
      // if(angle > -5 && angle < 5){
      //   console.log("angle",angle);
      //   angle = 0;
      // }
      group.set({
        angle : angle === 0 ? group.angle : angle - 90
      })

      group.forEachObject(obj=> {
        if( obj instanceof fabric.Line){
          const coords = obj.getCoords(false,true);
          console.log("coords",coords)
          obj.set({
            scaleX : Math.min( Math.abs(this.origX - x),Math.abs(this.origY - y)),
            scaleY : Math.min( Math.abs(this.origX - x),Math.abs(this.origY - y))
           }).setCoords()

          console.log(`x1 : ${obj.x1} \ny1 : ${obj.y1} \nx2 : ${obj.x2} \ny2 : ${obj.y2} \nabs : ${Math.abs(this.origY - y)}\----------------------`)
        }else{

        }
      });

      this.previousY = y;
      this.previousX = x;

      //group.setObjectsCoords();
      // Wrap the resized object in a Promise
      return new Promise<fabric.Object>(resolve => {
          resolve(group);
      });
  }

  calcArrowAngle(x1 : number, y1: number, x2: number, y2: number) : number {
    var angle = 0,
        x, y;
    x = (x2 - x1);
    y = (y2 - y1);
    if (x === 0) {
        angle = (y === 0) ? 0 : (y > 0) ? Math.PI / 2 : Math.PI * 3 / 2;
    } else if (y === 0) {
        angle = (x > 0) ? 0 : Math.PI;
    } else {
        angle = (x < 0) ? Math.atan(y / x) + Math.PI : (y < 0) ? Math.atan(y / x) + (2 * Math.PI) : Math.atan(y / x);
    }

    return (angle * 180 / Math.PI);
  }
}
