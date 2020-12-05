import { EventEmitter, Input, Output } from '@angular/core';
import { Component } from '@angular/core';
import { Map } from '@strat-editor/data'
@Component({
  selector: 'strat-editor-map-item',
  templateUrl: './map-item.component.html',
  styleUrls: ['./map-item.component.scss']
})
export class MapItemComponent {

 @Input() map : Map
 @Output() selectMap = new EventEmitter<Map>();

}
