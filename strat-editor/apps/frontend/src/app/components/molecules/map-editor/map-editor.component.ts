import { ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
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

  selectedMap : Map
  selectedFloor : Floor

  onMapSelected(map : Map){
    this.selectedMap = map;
    this.selectedFloor = map.floors[0]
    this.selectMap.emit(map);
    const canvasHeight = this.container.nativeElement.clientHeight;
    const canvasWidth = this.container.nativeElement.clientWidth;
    console.log("canvasHeight",canvasHeight);
    console.log("canvasWidth",canvasWidth);
    const editor = new DrawingEditor('canvas',canvasWidth,canvasHeight);
    editor.setBackgroundImageFromUrl("api/floor/image/" + this.selectedFloor.image)
  }
}
