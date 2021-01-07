import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthInfos, UserDto } from '@strat-editor/data';

@Component({
  selector: 'strat-editor-account-panel',
  templateUrl: './account-panel.component.html',
  styleUrls: ['./account-panel.component.scss'],
})
export class AccountPanelComponent implements OnInit {
  @Output() logIn = new EventEmitter<UserDto>();
  @Output() disconnect = new EventEmitter<void>();
  @Output() register = new EventEmitter<AuthInfos>();
  @Input() authInfos: AuthInfos;
  @Input() connexionFailed: boolean;
  private readonly passwordRegex: string =
    '(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}';

  public authForm = this.formBuilder.group({
    mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(this.passwordRegex),
    ]),
  });
  public isSubmitted: boolean = false;
  public isRegisterForm: boolean = false;

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

  get formControls() {
    return this.authForm.controls;
  }

  onDisconnect() {
    this.disconnect.emit();
  }

  onDisplayRegisterForm() {
    this.isRegisterForm = true;
  }
}
