import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface InfoModalData {
  title: string;
  text: string;
}

@Component({
  selector: 'strat-editor-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
})
export class InfoModalComponent implements OnInit {
  public title: string;
  public text: string;

  constructor(
    public dialogRef: MatDialogRef<InfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InfoModalData
  ) {}

  ngOnInit(): void {
    this.title = this.data.title;
    this.text = this.data.text;
    console.log('data', this.data);
  }

  closeModal() {
    this.dialogRef.close();
  }
}
