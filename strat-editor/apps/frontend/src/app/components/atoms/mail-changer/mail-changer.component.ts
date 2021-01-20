import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'strat-editor-mail-changer',
  templateUrl: './mail-changer.component.html',
  styleUrls: ['./mail-changer.component.scss'],
})
export class MailChangerComponent implements OnInit {
  @Input() httpError: HttpErrorResponse;
  @Input() oldMail: string;
  @Output() mailChange = new EventEmitter<string>();

  public isSubmitted: boolean = false;

  public mailForm = this.formBuilder.group(
    {
      mail: new FormControl('', [Validators.required, Validators.email]),
    },
    {
      validator: this.mustBeDifferent(),
    }
  );

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    this.isSubmitted = true;
    if (this.mailForm.valid)
      this.mailChange.emit(this.mailForm.get('mail').value);
  }

  private mustBeDifferent() {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls['mail'];

      if (control.value === this.oldMail) {
        control.setErrors({ different: true });
      } else {
        control.setErrors(null);
      }
    };
  }

  get formControls() {
    return this.mailForm.controls;
  }
}
