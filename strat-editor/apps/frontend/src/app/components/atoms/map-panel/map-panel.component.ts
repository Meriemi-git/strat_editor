import { EventEmitter, Input, Output } from '@angular/core';
import { Component } from '@angular/core';
import { Map } from '@strat-editor/data'
@Component({
  selector: 'strat-editor-map-panel',
  templateUrl: './map-panel.component.html',
  styleUrls: ['./map-panel.component.scss']
})
export class MapPanelComponent {
 @Input() map : Map
 @Output() selectMap = new EventEmitter<Map>();
}
