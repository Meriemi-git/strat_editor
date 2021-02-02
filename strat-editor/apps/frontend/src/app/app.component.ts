import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StratEditorState } from '@strat-editor/store';
import * as Actions from '@strat-editor/store';
import * as Selectors from '@strat-editor/store';
import { take } from 'rxjs/operators';
import { UserInfos } from '@strat-editor/data';
import { Observable } from 'rxjs';

@Component({
  selector: 'strat-editor-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public leftIsOpened: boolean;
  public rightIsOpened: boolean;
  public $userInfos: Observable<UserInfos>;

  constructor(private store: Store<StratEditorState>) {}

  ngOnInit(): void {
    this.$userInfos = this.store.select(Selectors.getUserInfos);
    this.store.select(Selectors.isLeftSidenavOpened).subscribe((isOpened) => {
      this.leftIsOpened = isOpened;
    });
    this.store.select(Selectors.isRightSidenavOpened).subscribe((isOpened) => {
      this.rightIsOpened = isOpened;
    });
  }

  onDisconnect() {
    this.store.dispatch(Actions.Disconnect());
  }

  onCloseLeftSidenav() {
    this.store
      .select(Selectors.isLeftSidenavOpened)
      .pipe(take(1))
      .subscribe((isOpen) => {
        if (isOpen) {
          this.store.dispatch(Actions.closeLeft());
        }
      });
  }

  onCloseRightSidenav() {
    this.store
      .select(Selectors.isRightSidenavOpened)
      .pipe(take(1))
      .subscribe((isOpen) => {
        if (isOpen) {
          this.store.dispatch(Actions.closeRight());
        }
      });
  }

  toggleLeftSidenav() {
    this.store.dispatch(Actions.toggleLeft());
  }

  toggleRightSidenav() {
    this.store.dispatch(Actions.toggleRight());
  }

  closeRightSidenav() {
    this.store.dispatch(Actions.closeRight());
  }

  closeLeftSidenav() {
    this.store.dispatch(Actions.closeLeft());
  }
}
