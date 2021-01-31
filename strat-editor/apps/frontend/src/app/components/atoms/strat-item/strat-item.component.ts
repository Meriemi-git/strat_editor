import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Strat } from '@strat-editor/data';

@Component({
  selector: 'strat-editor-strat-item',
  templateUrl: './strat-item.component.html',
  styleUrls: ['./strat-item.component.scss'],
})
export class StratItemComponent implements OnInit {
  @Input() strat: Strat;
  constructor() {}

  ngOnInit(): void {
    console.log('StratItemComponent strat:', this.strat);
  }
}
