import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DrawerAction } from '@strat-editor/data';
@Component({
  selector: 'strat-editor-drawing-action',
  templateUrl: './drawing-action.component.html',
  styleUrls: ['./drawing-action.component.scss'],
})
export class DrawingActionComponent {
  @Input() action: DrawerAction;
  @Output() actionSelected = new EventEmitter<DrawerAction>();

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.actionSelected.emit(this.action);
  }
}
