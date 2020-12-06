import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DrawingAction } from '@strat-editor/drawing-editor';

@Component({
  selector: 'strat-editor-drawing-action',
  templateUrl: './drawing-action.component.html',
  styleUrls: ['./drawing-action.component.scss']
})
export class DrawingActionComponent{

  @Input() action : DrawingAction;
  @Output() actionSelected = new EventEmitter<DrawingAction>();

  onIconClicked(){
    this.actionSelected.emit(this.action);
  }
}
