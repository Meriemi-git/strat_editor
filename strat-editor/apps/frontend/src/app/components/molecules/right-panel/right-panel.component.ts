import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthInfos, UserInfos } from '@strat-editor/data';
import { Observable } from 'rxjs';
import * as StratStore from '@strat-editor/store';
@Component({
  selector: 'strat-editor-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss'],
})
export class RightPanelComponent implements OnInit {
  public $isDrawingPanelOpened: Observable<boolean>;
  public $isGalleryPanelOpened: Observable<boolean>;
  public $authInfos: Observable<AuthInfos>;
  public $userInfos: Observable<UserInfos>;
  constructor(private store: Store<StratStore.StratEditorState>) {}

  ngOnInit(): void {
    this.$isDrawingPanelOpened = this.store.select(
      StratStore.isDrawingPanelOpened
    );
    this.$isGalleryPanelOpened = this.store.select(
      StratStore.isGalleryPanelOpened
    );
    this.$userInfos = this.store.select(StratStore.getUserInfos);
  }
}
