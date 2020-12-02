import { ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { Map,Floor } from '@strat-editor/data';
import { DrawingEditor} from '../../../fabric/drawing-editor'

@Component({
  selector: 'strat-editor-map-editor',
  templateUrl: './map-editor.component.html',
  styleUrls: ['./map-editor.component.scss']
})
export class MapEditorComponent {


  @Input() maps : Map[]
  @Output() selectMap = new EventEmitter<Map>();

  @ViewChild("container") container : ElementRef;
  @ViewChild("canvas") canvas : ElementRef;
  selectedMap : Map
  selectedFloor : Floor

  constructor(private renderer : Renderer2){}

  onMapSelected(map : Map){
    this.selectedMap = map;
    this.selectedFloor = map.floors[0]
    this.selectMap.emit(map);
    this.displayCanvas();
  }

  displayCanvas(){
    this.renderer.setStyle(this.canvas.nativeElement,'display',"block");
    const canvasHeight = this.container.nativeElement.clientHeight;
    const canvasWidth = this.container.nativeElement.clientWidth;
    console.log("canvasHeight",canvasHeight)
    console.log("canvasWidth",canvasWidth)
    const editor = new DrawingEditor('canvas',canvasWidth,canvasHeight);
    editor.setBackgroundImageFromUrl("api/floor/image/" + this.selectedFloor.image)
  }
}
