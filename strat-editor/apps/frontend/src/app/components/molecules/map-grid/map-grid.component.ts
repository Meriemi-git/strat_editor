import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Map } from '@strat-editor/data'
@Component({
  selector: 'strat-editor-map-grid',
  templateUrl: './map-grid.component.html',
  styleUrls: ['./map-grid.component.scss']
})
export class MapGridComponent {
  @Input() maps : Map[]
  @Output() selectMap = new EventEmitter<Map>();

  onSelectMap(map : Map){
    this.selectMap.emit(map);
  }

}
