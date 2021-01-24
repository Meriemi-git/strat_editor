import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Image } from '@strat-editor/data';

@Component({
  selector: 'strat-editor-images-item',
  templateUrl: './images-item.component.html',
  styleUrls: ['./images-item.component.scss'],
})
export class ImagesItemComponent implements OnInit {
  @Input() image: Image;
  @Input() width: number;
  @Output() imageDragged = new EventEmitter<Image>();

  private isDown: boolean;

  constructor() {}

  ngOnInit(): void {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: any) {
    this.isDown = true;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: any) {
    if (this.isDown) {
      this.imageDragged.emit(this.image);
      this.isDown = false;
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: any) {
    this.isDown = false;
  }

  @HostListener('mouseout', ['$event'])
  onMouseOut(event: any) {
    this.isDown = false;
  }
}
