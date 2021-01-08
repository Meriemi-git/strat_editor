import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthInfos, UserDto } from '@strat-editor/data';

@Component({
  selector: 'strat-editor-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  @Output() register = new EventEmitter<UserDto>();
  @Output() displayLoginForm = new EventEmitter<void>();
  @Input() httpErrorResponse: HttpErrorResponse;

  private readonly passwordRegex: string =
    '(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}';

  public authForm = this.formBuilder.group({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    mail: new FormControl('', [Validators.required, Validators.email]),
    confirmMail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(this.passwordRegex),
    ]),
  });
  public isSubmitted: boolean = false;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

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
}
