import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthInfos } from '@strat-editor/data';
import { Observable } from 'rxjs';
import { StratEditorState } from '../../../store/reducers';
import * as Selectors from '../../../store/selectors';
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
  }
}
