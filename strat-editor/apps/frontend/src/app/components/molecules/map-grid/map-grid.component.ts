import { Component, Input, OnInit } from '@angular/core';
import { Map } from '@strat-editor/data'
@Component({
  selector: 'strat-editor-map-grid',
  templateUrl: './map-grid.component.html',
  styleUrls: ['./map-grid.component.scss']
})
export class MapGridComponent implements OnInit {
  @Input() maps : Map[]
  constructor() { }

  ngOnInit(): void {
  }

}
