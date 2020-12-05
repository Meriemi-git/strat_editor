import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DrawingAction } from '../../../drawer/actions/drawing-action';

@Component({
  selector: 'strat-editor-drawing-action',
  templateUrl: './drawing-action.component.html',
  styleUrls: ['./drawing-action.component.scss']
})
export class DrawingActionComponent implements OnInit{

  @Input() action : DrawingAction;
  @Output() actionClicked = new EventEmitter<DrawingAction>();

  onIconClicked(){
    this.actionClicked.emit(this.action);
  }

  ngOnInit(): void {
    console.log(this.action);
  }

}
