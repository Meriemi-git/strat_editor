import { EventEmitter, Input, Output } from '@angular/core';
import { Component } from '@angular/core';
import { Map } from '@strat-editor/data';

@Component({
  selector: 'strat-editor-map-editor',
  templateUrl: './map-editor.component.html',
  styleUrls: ['./map-editor.component.scss']
})
export class MapEditorComponent {
  @Input() maps : Map[]
  @Output() selectMap = new EventEmitter<Map>();
  selectedMap : Map

  constructor(){

  }
}
