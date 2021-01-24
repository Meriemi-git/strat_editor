import { Component, Input } from '@angular/core';
import { Image } from '@strat-editor/data';

@Component({
  selector: 'strat-editor-images-grid',
  templateUrl: './images-grid.component.html',
  styleUrls: ['./images-grid.component.scss'],
})
export class ImagesGridComponent {
  @Input() images: Image[];

  constructor() {}

  getThirdLength(): number {
    const thirdHeight = Math.ceil(
      this.images.reduce((total, image) => total + image.thumbHeight, 0) / 3
    );
    let halfLength = 0;
    let sumHeight = 0;
    this.images.map((image) => {
      if (sumHeight < thirdHeight) {
        halfLength++;
        sumHeight += image.thumbHeight;
      }
    });
    return halfLength;
  }

  getTwoThirdLength(): number {
    const thirdHeight = Math.ceil(
      this.images.reduce((total, image) => total + image.thumbHeight, 0) / 3
    );
    let halfLength = 0;
    let sumHeight = 0;
    this.images.map((image) => {
      if (sumHeight < thirdHeight * 2) {
        halfLength++;
        sumHeight += image.thumbHeight;
      }
    });
    return halfLength;
  }
}
