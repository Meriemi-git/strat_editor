import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Map } from '@strat-editor/data';

@Component({
  selector: 'strat-editor-map-selector',
  templateUrl: './map-selector.component.html',
  styleUrls: ['./map-selector.component.scss'],
})
export class MapSelectorComponent implements OnInit {
  @Input() maps: Map[];
  @Output() mapSelected = new EventEmitter<Map>();
  constructor() {}

  ngOnInit(): void {}

  onMapSelected(map: Map) {
    this.mapSelected.emit(map);
  }
}
