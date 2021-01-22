import { Component, EventEmitter, OnInit, Output } from '@angular/core';
@Component({
  selector: 'strat-editor-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
})
export class ImageUploaderComponent implements OnInit {
  @Output() imageUploaded = new EventEmitter<File>();
  constructor() {}

  ngOnInit(): void {}

  onFileChange(fileList: FileList) {
    if (fileList.length > 0) {
      if (fileList[0].size / 1024 <= 5120) {
        this.imageUploaded.emit(fileList[0]);
      }
    }
  }
}
