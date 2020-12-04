import { ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { Map,Floor } from '@strat-editor/data';
import { DrawingEditor} from '../../../fabric/drawing-editor'
import { HostListener } from "@angular/core";

@Component({
  selector: 'strat-editor-map-panel',
  templateUrl: './map-panel.component.html',
  styleUrls: ['./map-panel.component.scss']
})
export class MapEditorComponent {


  @Input() maps : Map[]
  @Output() selectMap = new EventEmitter<Map>();

  @ViewChild("container") container : ElementRef;
  @ViewChild("canvas") canvas : ElementRef;
  editor : DrawingEditor;
  selectedMap : Map
  selectedFloor : Floor
  screenWidth : number;
  canvasHeight : number;


  constructor(private renderer : Renderer2){}

  onMapSelected(map : Map){
    this.selectedMap = map;
    this.selectedFloor = map.floors[1]
    this.selectMap.emit(map);
    this.displayCanvas();
  }

  displayCanvas(){
    this.renderer.setStyle(this.canvas.nativeElement,'display',"block");
    this.screenWidth = window.innerWidth * 98 / 100;
    this.canvasHeight = this.container.nativeElement.clientHeight;
    console.log("canvasHeight",this.canvasHeight)
    console.log("canvasWidth",this.screenWidth)
    this.editor = new DrawingEditor('canvas',this.screenWidth,this.canvasHeight);
    this.editor.setBackgroundImageFromUrl("api/floor/image/" + this.selectedFloor.image)
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
    this.canvasHeight =  this.container.nativeElement.clientHeight;
    this.editor.resize( this.screenWidth, this.canvasHeight)
    this.editor.setBackgroundImageFromUrl("api/floor/image/" + this.selectedFloor.image)
  }
}
