import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { User } from '@strat-editor/data';
import { AccountPanelComponent } from '../../molecules/account-panel/account-panel.component';

@Component({
  selector: 'strat-editor-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  @Input() username: string;
  @Output() accountButtonClick = new EventEmitter<void>();
  constructor() {}
  onButtonClick() {
    this.accountButtonClick.emit();
  }
}
