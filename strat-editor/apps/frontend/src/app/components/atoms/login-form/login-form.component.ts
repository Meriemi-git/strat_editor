import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserDto } from '@strat-editor/data';

@Component({
  selector: 'strat-editor-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Input() httpError: HttpErrorResponse;
  @Output() logIn = new EventEmitter<UserDto>();
  @Output() displayRegisterForm = new EventEmitter<void>();

  public authForm = this.formBuilder.group({
    mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  public isSubmitted: boolean = false;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    this.isSubmitted = true;
    if (this.authForm.valid) {
      const userDto: UserDto = {
        mail: this.authForm.get('mail').value,
        password: this.authForm.get('password').value,
      };
      this.logIn.emit(userDto);
      this.isSubmitted = false;
    }
  }

  onDisplayRegisterForm() {
    this.displayRegisterForm.emit();
  }

  get formControls() {
    return this.authForm.controls;
  }
}
