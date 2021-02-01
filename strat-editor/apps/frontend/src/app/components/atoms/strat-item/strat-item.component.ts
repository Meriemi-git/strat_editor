import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Strat } from '@strat-editor/data';

@Component({
  selector: 'strat-editor-strat-item',
  templateUrl: './strat-item.component.html',
  styleUrls: ['./strat-item.component.scss'],
})
export class StratItemComponent {
  @Input() strat: Strat;
  public onHover: boolean;
  constructor() {}
}
