import { ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { Map,Floor } from '@strat-editor/data';
import { HostListener } from "@angular/core";
import { DrawingEditorComponent } from '@strat-editor/drawing-editor';

@Component({
  selector: 'strat-editor-map-panel',
  templateUrl: './map-panel.component.html',
  styleUrls: ['./map-panel.component.scss']
})
export class MapPanelComponent {


  @Input() maps : Map[]

  @Output() selectMap = new EventEmitter<Map>();

  @ViewChild("container") container : ElementRef;
  @ViewChild('drawerEditor') drawerEditor : DrawingEditorComponent;

  selectedMap : Map
  selectedFloor : Floor
  width : number;
  height : number;


  onMapSelected(map : Map){
    this.selectedMap = map;
    this.selectedFloor = map.floors[1]
    this.selectMap.emit(map);
    this.displayCanvas();
  }

  displayCanvas(){
    this.width = window.innerWidth * 98 / 100;
    this.height = this.container.nativeElement.clientHeight;
    this.drawerEditor.resize( this.width, this.height)
    this.drawerEditor.setBackgroundImageFromUrl("api/floor/image/" + this.selectedFloor.image)
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.width = window.innerWidth;
    this.height =  this.container.nativeElement.clientHeight;
    this.drawerEditor.resize( this.width, this.height)
    this.drawerEditor.setBackgroundImageFromUrl("api/floor/image/" + this.selectedFloor.image)
  }

  updatePointerIcon(iconUrl: string) {
    this.drawerEditor.updatePointerIcon(iconUrl);
  }

  setDrawerByName(name: string) {
    this.drawerEditor.setDrawerByName(name);
  }
}
