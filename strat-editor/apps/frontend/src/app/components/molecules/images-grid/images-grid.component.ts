import { Component, Input, OnInit } from '@angular/core';
import { Image } from '@strat-editor/data';
@Component({
  selector: 'strat-editor-images-grid',
  templateUrl: './images-grid.component.html',
  styleUrls: ['./images-grid.component.scss'],
})
export class ImagesGridComponent implements OnInit {
  @Input() images: Image[];
  public leftImages: Image[];
  public rightImages: Image[];
  constructor() {}

  ngOnInit(): void {
    let halfLength = Math.floor(this.images.length / 2);
    this.leftImages = this.images.slice(0, halfLength);
    this.rightImages = this.images.slice(halfLength, this.images.length);
  }
}
