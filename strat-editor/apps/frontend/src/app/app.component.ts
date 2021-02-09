import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as StratStore from '@strat-editor/store';
import { take } from 'rxjs/operators';
import { UserInfos } from '@strat-editor/data';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'strat-editor-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public leftIsOpened: boolean;
  public rightIsOpened: boolean;
  public $userInfos: Observable<UserInfos>;
  constructor(private store: Store<StratStore.StratEditorState>) {}

  ngOnInit(): void {
    this.$userInfos = this.store.select(StratStore.getUserInfos);
    this.store.select(StratStore.isLeftSidenavOpened).subscribe((isOpened) => {
      this.leftIsOpened = isOpened;
    });
    this.store.select(StratStore.isRightSidenavOpened).subscribe((isOpened) => {
      this.rightIsOpened = isOpened;
    });
  }

  onDisconnect() {
    this.store.dispatch(StratStore.Disconnect());
  }

  onCloseLeftSidenav() {
    this.store
      .select(StratStore.isLeftSidenavOpened)
      .pipe(take(1))
      .subscribe((isOpen) => {
        if (isOpen) {
          this.store.dispatch(StratStore.closeLeft());
        }
      });
  }

  onCloseRightSidenav() {
    this.store
      .select(StratStore.isRightSidenavOpened)
      .pipe(take(1))
      .subscribe((isOpen) => {
        if (isOpen) {
          this.store.dispatch(StratStore.closeRight());
        }
      });
  }

  toggleLeftSidenav() {
    this.store.dispatch(StratStore.toggleLeft());
  }

  toggleRightSidenav() {
    this.store.dispatch(StratStore.toggleRight());
  }

  closeRightSidenav() {
    this.store.dispatch(StratStore.closeRight());
  }

  closeLeftSidenav() {
    this.store.dispatch(StratStore.closeLeft());
  }
}
