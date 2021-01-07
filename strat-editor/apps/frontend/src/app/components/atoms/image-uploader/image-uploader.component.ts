import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GalleryService } from '../../../services/gallery.service';
@Component({
  selector: 'strat-editor-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
})
export class ImageUploaderComponent implements OnInit {
  @Output() imageUploaded = new EventEmitter<string>();
  @Input() userId: string;
  constructor(private galleryService: GalleryService) {}

  ngOnInit(): void {
    console.log(this.userId);
  }

  onFileChange(fileList: FileList) {
    if (fileList.length > 0) {
      this.galleryService.uploadImage(fileList[0]);
    }
  }
}
