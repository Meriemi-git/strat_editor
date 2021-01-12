import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StratEditorState } from './store/reducers';
import * as Actions from './store/actions';
import * as Selectors from './store/selectors';
import { take } from 'rxjs/operators';
@Component({
  selector: 'strat-editor-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public leftIsOpened: boolean;
  public rightIsOpened: boolean;
  public username: string;

  constructor(private store: Store<StratEditorState>) {}

  ngOnInit(): void {
    this.store
      .select(Selectors.getUserInfos)
      .subscribe((authInfos) => (this.username = authInfos?.username));

    this.store.select(Selectors.isLeftSidenavOpened).subscribe((isOpened) => {
      this.leftIsOpened = isOpened;
    });
    this.store.select(Selectors.isRightSidenavOpened).subscribe((isOpened) => {
      this.rightIsOpened = isOpened;
    });
  }

  onAccountButtonClicked() {
    this.store.dispatch(Actions.showAccountPanel());
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
