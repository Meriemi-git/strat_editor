import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface StratInfosDialogData {
  name: string;
  description: string;
  isPublic: boolean;
}

@Component({
  selector: 'strat-editor-strat-saving-modal',
  templateUrl: './strat-saving-dialog.component.html',
  styleUrls: ['./strat-saving-dialog.component.scss'],
})
export class StratSavingDialogComponent implements OnInit {
  stratInfos: StratInfosDialogData;

  public isSubmitted: boolean = false;

  public stratForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<StratSavingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StratInfosDialogData,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.stratInfos = this.data;
    this.stratForm = this.formBuilder.group({
      name: new FormControl(this.stratInfos.name, [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl(this.stratInfos.description),
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.stratForm.valid) {
      this.isSubmitted = false;
      this.stratInfos.name = this.stratForm.get('name').value;
      this.stratInfos.description = this.stratForm.get('description').value;
      this.dialogRef.close(this.stratInfos);
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  get fc() {
    return this.stratForm.controls;
  }
}
