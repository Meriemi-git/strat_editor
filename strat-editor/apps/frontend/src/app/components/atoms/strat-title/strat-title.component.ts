import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'strat-editor-strat-title',
  templateUrl: './strat-title.component.html',
  styleUrls: ['./strat-title.component.scss'],
})
export class StratTitleComponent {
  @Input() stratTitle: string;
  constructor() {}
}
