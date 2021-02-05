import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Floor, Map } from '@strat-editor/data';

@Component({
  selector: 'strat-editor-floor-chooser',
  templateUrl: './floor-chooser.component.html',
  styleUrls: ['./floor-chooser.component.scss'],
})
export class FloorChooserComponent {
  @Input() maps: Map[];
  @Input() floors: Floor[];
  @Input() selectedMap: Map;
  @Input() selectedFloor: Floor;

  @Output() mapSelected = new EventEmitter<Map>();
  @Output() floorSelected = new EventEmitter<Floor>();

  constructor() {}

  onMapSelected(map: Map) {
    this.mapSelected.emit(map);
  }

  onFloorSelected(floor: Floor) {
    this.floorSelected.emit(floor);
  }
}
