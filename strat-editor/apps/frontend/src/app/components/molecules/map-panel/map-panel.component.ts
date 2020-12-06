import { ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { Map,Floor } from '@strat-editor/data';
import { DrawingEditor, ObjectDrawer} from '@strat-editor/drawer'
//import { DrawingAction, } from '../../../drawer/actions';
//import { DrawingEditor } from '../../../drawer/drawing-editor';
//import { ObjectDrawer }from '../../../drawer/drawers/object-drawer';
import { HostListener } from "@angular/core";

@Component({
  selector: 'strat-editor-map-panel',
  templateUrl: './map-panel.component.html',
  styleUrls: ['./map-panel.component.scss']
})
export class MapPanelComponent {


  @Input() maps : Map[]

  @Output() selectMap = new EventEmitter<Map>();
  @Output() canvasClicked = new EventEmitter<void>();

  @ViewChild("container") container : ElementRef;
  @ViewChild("canvas") canvas : ElementRef;

  drawerEditor : DrawingEditor;
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
    this.drawerEditor = new DrawingEditor('canvas',this.screenWidth,this.canvasHeight);
    this.drawerEditor.setBackgroundImageFromUrl("api/floor/image/" + this.selectedFloor.image)
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
    this.canvasHeight =  this.container.nativeElement.clientHeight;
    this.drawerEditor.resize( this.screenWidth, this.canvasHeight)
    this.drawerEditor.setBackgroundImageFromUrl("api/floor/image/" + this.selectedFloor.image)
  }

  updatePointerIcon(iconUrl: string) {
    this.drawerEditor.updatePointerIcon(iconUrl);
  }

  onCanvasClicked(){
    this.canvasClicked.emit();
  }

  setDrawer(selected: ObjectDrawer) {
    this.drawerEditor.setDrawer(selected);
  }
}
