import { Component, Input, OnInit } from '@angular/core';
import { CursorMode } from '@strat-editor/data';

@Component({
  selector: 'strat-editor-drawing-status',
  templateUrl: './drawing-status.component.html',
  styleUrls: ['./drawing-status.component.scss'],
})
export class DrawingStatusComponent implements OnInit {
  @Input() sttaus: CursorMode;
  public CursorModeEnum = CursorMode;
  constructor() {}

  ngOnInit(): void {}
}
