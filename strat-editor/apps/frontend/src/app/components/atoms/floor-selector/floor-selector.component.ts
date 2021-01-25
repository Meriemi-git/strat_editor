import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Floor } from '@strat-editor/data';

@Component({
  selector: 'strat-editor-floor-selector',
  templateUrl: './floor-selector.component.html',
  styleUrls: ['./floor-selector.component.scss'],
})
export class FloorSelectorComponent {
  @Input() floors: Floor[];
  @Input() selectedFloor: Floor;
  @Output() floorSelected = new EventEmitter<Floor>();
  public selected: Floor;

  constructor() {}

  onFloorSelected(floor: Floor) {
    this.floorSelected.emit(floor);
  }
}
