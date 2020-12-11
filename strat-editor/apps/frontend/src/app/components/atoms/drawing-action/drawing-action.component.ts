import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DrawerAction } from '@strat-editor/drawing-editor';
import { IconHelperService } from '@strat-editor/drawing-editor';
@Component({
  selector: 'strat-editor-drawing-action',
  templateUrl: './drawing-action.component.html',
  styleUrls: ['./drawing-action.component.scss'],
})
export class DrawingActionComponent {
  @Input() action: DrawerAction;
  @Output() actionSelected = new EventEmitter<DrawerAction>();
  constructor(public ihs: IconHelperService) {}

  onIconClicked() {
    this.actionSelected.emit(this.action);
  }
}
