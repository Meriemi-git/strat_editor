import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as StratStore from '@strat-editor/store';
import { Image, UserInfos } from '@strat-editor/data';

@Component({
  selector: 'strat-editor-gallery-panel',
  templateUrl: './gallery-panel.component.html',
  styleUrls: ['./gallery-panel.component.scss'],
})
export class GalleryPanelComponent implements OnInit {
  public $images: Observable<Image[]>;
  @Input() userInfos: UserInfos;
  constructor(private store: Store<StratStore.StratEditorState>) {}

  ngOnInit(): void {
    this.$images = this.store.select(StratStore.getGalleryImages);
    this.store.dispatch(StratStore.GetGalleryImages());
  }

  onImageUploaded(image: File): void {
    this.store.dispatch(StratStore.UploadGalleryImage({ image }));
  }

  onImageDragged(image: Image) {
    this.store.dispatch(StratStore.DragImage({ image }));
  }
}
