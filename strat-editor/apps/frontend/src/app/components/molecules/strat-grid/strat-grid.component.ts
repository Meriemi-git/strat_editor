import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Strat } from '@strat-editor/data';

@Component({
  selector: 'strat-editor-strat-grid',
  templateUrl: './strat-grid.component.html',
  styleUrls: ['./strat-grid.component.scss'],
})
export class StratGridComponent implements OnInit {
  @Input() strats: Strat[];
  @Output() selectStrat = new EventEmitter<Strat>();

  ngOnInit(): void {}
  onSelectMap(strat: Strat) {
    this.selectStrat.emit(strat);
  }
}
