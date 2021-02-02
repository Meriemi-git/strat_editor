import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DualChoiceDialogData {
  title: string;
  description: string;
  confirmButtonText: string;
  cancelButtonText: string;
}

@Component({
  selector: 'strat-editor-dual-choice-dialog',
  templateUrl: './dual-choice-dialog.component.html',
  styleUrls: ['./dual-choice-dialog.component.scss'],
})
export class DualChoiceDialogComponent implements OnInit {
  public dialogData: DualChoiceDialogData;
  constructor(
    public dialogRef: MatDialogRef<DualChoiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DualChoiceDialogData
  ) {}

  ngOnInit(): void {
    this.dialogData = this.data;
  }

  onConfirm() {
    this.dialogRef.close(true);
  }
  onCancel() {
    this.dialogRef.close(false);
  }
}
