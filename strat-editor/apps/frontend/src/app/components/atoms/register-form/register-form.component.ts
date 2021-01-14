import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserDto } from '@strat-editor/data';

@Component({
  selector: 'strat-editor-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  @Output() register = new EventEmitter<UserDto>();
  @Output() displayLoginForm = new EventEmitter<void>();
  @Input() httpError: HttpErrorResponse;

  private readonly passwordRegex: string =
    '(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}';

  public authForm = this.formBuilder.group(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      mail: new FormControl('', [Validators.required, Validators.email]),

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
  public isSubmitted: boolean = false;
  CGUAccepted: boolean;
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    console.log('RegisterFormComponent httpErrorResponse:', this.httpError);
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.authForm.valid) {
      const userDto: UserDto = {
        username: this.authForm.get('username').value,
        mail: this.authForm.get('mail').value,
        password: this.authForm.get('password').value,
      };
      this.register.emit(userDto);
      this.isSubmitted = false;
    }
  }
  get formControls() {
    return this.authForm.controls;
  }

  onDisplayLoginForm() {
    this.displayLoginForm.emit();
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

  closeRegisterForm() {
    this.router.navigateByUrl('/');
  }

  toogleAcceptance(accepted: boolean) {
    this.CGUAccepted = accepted;
  }
}
