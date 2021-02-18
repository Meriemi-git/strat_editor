import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Strat } from '@strat-editor/data';

@Component({
  selector: 'strat-editor-strat-filters',
  templateUrl: './strat-filters.component.html',
  styleUrls: ['./strat-filters.component.scss'],
})
export class StratFiltersComponent implements OnInit {
  @Input() strats: Strat[];
  @Output() filter = new EventEmitter<Strat>();
  constructor() {}

  ngOnInit(): void {}
}
