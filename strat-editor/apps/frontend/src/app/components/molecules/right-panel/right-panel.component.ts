import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthInfos, UserDto } from '@strat-editor/data';
import { Observable, of } from 'rxjs';
import { StratEditorState } from '../../../store/reducers';
import * as Selectors from '../../../store/selectors';
import * as Actions from '../../../store/actions';
import { map, catchError } from 'rxjs/operators';
@Component({
  selector: 'strat-editor-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss'],
})
export class RightPanelComponent implements OnInit {
  $isDrawingPanelOpened: Observable<boolean>;
  $isGalleryPanelOpened: Observable<boolean>;
  $isAccountPanelOpened: Observable<boolean>;
  $authInfos: Observable<AuthInfos>;
  connexionFailed: boolean;
  constructor(private store: Store<StratEditorState>) {}

  ngOnInit(): void {
    this.$isDrawingPanelOpened = this.store.select(
      Selectors.isDrawingPanelOpened
    );
    this.$isGalleryPanelOpened = this.store.select(
      Selectors.isGalleryPanelOpened
    );
    this.$isAccountPanelOpened = this.store.select(
      Selectors.isAccountPanelOpened
    );
    this.$authInfos = this.store.select(Selectors.getAuthInfos);
    this.$authInfos.subscribe((authInfos) => {
      if (authInfos) {
        localStorage.setItem('accessToken', authInfos.accessToken);
        this.connexionFailed = false;
      }
    });
    this.store.select(Selectors.getAuthError).subscribe((error) => {
      this.connexionFailed = error !== null;
    });
  }

  onLogin(userDto: UserDto) {
    this.store.dispatch(Actions.LogIn({ userDto }));
  }

  onDisconnect() {
    this.store.dispatch(Actions.Disconnect());
  }
}
