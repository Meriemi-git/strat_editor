import { Component, Input, OnInit } from '@angular/core';
import { DrawingMode } from '@strat-editor/data';

@Component({
  selector: 'strat-editor-drawing-status',
  templateUrl: './drawing-status.component.html',
  styleUrls: ['./drawing-status.component.scss'],
})
export class DrawingStatusComponent implements OnInit {
  @Input() drawingMode: DrawingMode;
  public DrawingModeEnum = DrawingMode;
  constructor() {}

  ngOnInit(): void {}
}
