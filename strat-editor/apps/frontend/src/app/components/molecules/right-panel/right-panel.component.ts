import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthInfos, UserInfos } from '@strat-editor/data';
import { Observable } from 'rxjs';
import { StratEditorState } from '../../../store/reducers';
import * as Selectors from '../../../store/selectors';
@Component({
  selector: 'strat-editor-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss'],
})
export class RightPanelComponent implements OnInit {
  public $isDrawingPanelOpened: Observable<boolean>;
  public $isGalleryPanelOpened: Observable<boolean>;
  public $isAccountPanelOpened: Observable<boolean>;
  public $authInfos: Observable<AuthInfos>;
  public $userInfos: Observable<UserInfos>;
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
    this.$userInfos = this.store.select(Selectors.getUserInfos);
  }
}
