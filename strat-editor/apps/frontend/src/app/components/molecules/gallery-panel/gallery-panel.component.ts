import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StratEditorState } from '@strat-editor/store';
import { Image, UserInfos } from '@strat-editor/data';
import * as Selectors from '@strat-editor/store';
import * as Actions from '@strat-editor/store';

@Component({
  selector: 'strat-editor-gallery-panel',
  templateUrl: './gallery-panel.component.html',
  styleUrls: ['./gallery-panel.component.scss'],
})
export class GalleryPanelComponent implements OnInit {
  public $images: Observable<Image[]>;
  @Input() userInfos: UserInfos;
  constructor(private store: Store<StratEditorState>) {}

  ngOnInit(): void {
    this.$images = this.store.select(Selectors.getGalleryImages);
    this.store.dispatch(Actions.GetGalleryImages());
  }

  onImageUploaded(image: File): void {
    this.store.dispatch(Actions.UploadGalleryImage({ image }));
  }

  onImageDragged(image: Image) {
    this.store.dispatch(Actions.DragImage({ image }));
  }
}
