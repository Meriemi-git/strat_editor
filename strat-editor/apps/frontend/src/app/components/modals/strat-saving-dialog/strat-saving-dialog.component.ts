import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Strat } from '@strat-editor/data';

export interface StratInfosDialogData {
  strat: Strat;
}

@Component({
  selector: 'strat-editor-strat-saving-modal',
  templateUrl: './strat-saving-dialog.component.html',
  styleUrls: ['./strat-saving-dialog.component.scss'],
})
export class StratSavingDialogComponent implements OnInit {
  public strat: Strat;
  public isSubmitted: boolean = false;
  public isPublic: boolean;
  public stratForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl(''),
  });
  constructor(
    public dialogRef: MatDialogRef<StratSavingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StratInfosDialogData,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.strat = this.data.strat;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.stratForm.valid) {
      this.isSubmitted = false;
      this.strat.name = this.stratForm.get('name').value;
      this.strat.description = this.stratForm.get('description').value;
      this.strat.isPublic = this.isPublic;
    }
    this.dialogRef.close(this.strat);
  }

  onClose() {
    this.dialogRef.close();
  }

  get fc() {
    return this.stratForm.controls;
  }
}
