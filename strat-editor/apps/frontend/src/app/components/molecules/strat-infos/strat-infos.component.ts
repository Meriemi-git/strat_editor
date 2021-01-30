import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Strat } from '@strat-editor/data';

@Component({
  selector: 'strat-editor-strat-infos',
  templateUrl: './strat-infos.component.html',
  styleUrls: ['./strat-infos.component.scss'],
})
export class StratInfosComponent implements OnInit {
  @Input() strat: Strat;
  @Output() like = new EventEmitter<Strat>();
  @Output() share = new EventEmitter<Strat>();

  constructor() {}

  ngOnInit(): void {}

  onLike() {
    this.like.emit(this.strat);
  }
  onShare() {
    this.share.emit(this.strat);
  }
}
