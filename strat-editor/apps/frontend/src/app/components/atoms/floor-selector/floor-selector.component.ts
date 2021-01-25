import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Floor } from '@strat-editor/data';

@Component({
  selector: 'strat-editor-floor-selector',
  templateUrl: './floor-selector.component.html',
  styleUrls: ['./floor-selector.component.scss'],
})
export class FloorSelectorComponent implements OnInit {
  @Input() floors: Floor[];
  @Output() floorSelected = new EventEmitter<Floor>();
  constructor() {}

  ngOnInit(): void {}

  onFloorSelected(floor: Floor) {
    this.floorSelected.emit(floor);
  }

  getDefaultFloor(): Floor {
    return this.floors ? this.floors[0] : null;
  }
}
