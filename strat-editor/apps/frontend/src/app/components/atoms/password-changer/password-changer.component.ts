import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { PasswordChangeWrapper } from '@strat-editor/data';
import { Observable } from 'rxjs';

@Component({
  selector: 'strat-editor-password-changer',
  templateUrl: './password-changer.component.html',
  styleUrls: ['./password-changer.component.scss'],
})
export class PasswordChangerComponent implements OnInit {
  @Input() httpError: HttpErrorResponse;
  @Output() passwordChanged = new EventEmitter<PasswordChangeWrapper>();

  private readonly passwordRegex: string =
    '(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}';

  public passwordForm = this.formBuilder.group(
    {
      oldPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(this.passwordRegex),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(this.passwordRegex),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(this.passwordRegex),
      ]),
    },
    {
      validator: this.mustMatch('password', 'confirmPassword'),
    }
  );

  public isSubmitted: boolean;

  public get formControls() {
    return this.passwordForm.controls;
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    this.isSubmitted = true;
    if (this.passwordForm.valid) {
      const passwords: PasswordChangeWrapper = {
        oldPassword: this.passwordForm.get('oldPassword').value,
        newPassword: this.passwordForm.get('password').value,
      };
      this.passwordChanged.emit(passwords);
    }
  }

  private mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ match: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
