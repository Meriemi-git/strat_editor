import { Component, Input, OnInit } from '@angular/core';
import { Floor, Map } from '@strat-editor/data';

@Component({
  selector: 'strat-editor-floor-chooser',
  templateUrl: './floor-chooser.component.html',
  styleUrls: ['./floor-chooser.component.scss'],
})
export class FloorChooserComponent implements OnInit {
  @Input() maps: Map[];
  public floors: Floor[];

  constructor() {}

  ngOnInit(): void {}

  onMapSelected(map: Map) {
    this.floors = map.floors;
  }

  onFloorSelected(floor: Floor) {}
}
