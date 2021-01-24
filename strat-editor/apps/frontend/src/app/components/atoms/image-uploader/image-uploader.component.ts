import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
@Component({
  selector: 'strat-editor-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
})
export class ImageUploaderComponent implements OnInit {
  @Output() imageUploaded = new EventEmitter<File>();
  public fileName: string;
  constructor() {}

  ngOnInit(): void {}

  onFileChange(fileList: FileList) {
    if (fileList.length > 0) {
      if (fileList[0].size / 1024 <= 5120) {
        this.fileName = fileList[0].name;
        this.imageUploaded.emit(fileList[0]);
      }
    }
  }
}
