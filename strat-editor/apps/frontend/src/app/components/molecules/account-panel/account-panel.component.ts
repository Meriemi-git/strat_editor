import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthInfos, UserDto } from '@strat-editor/data';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'strat-editor-account-panel',
  templateUrl: './account-panel.component.html',
  styleUrls: ['./account-panel.component.scss'],
})
export class AccountPanelComponent implements OnInit {
  @Output() logIn = new EventEmitter<AuthInfos>();
  @Output() disconnect = new EventEmitter<void>();
  @Input() authInfos: AuthInfos;
  private readonly passwordRegex: string =
    '(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}';
  authForm = this.formBuilder.group({
    mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(this.passwordRegex),
    ]),
  });
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.isSubmitted = true;
    if (this.authForm.valid) {
      const userDto: UserDto = {
        mail: this.authForm.get('mail').value,
        password: this.authForm.get('password').value,
      };
      this.userService.login(userDto).subscribe((authInfos) => {
        localStorage.setItem('accessToken', authInfos.accessToken);
        this.logIn.emit(authInfos);
        //this.authForm.get('mail').value.set(null);
        //this.authForm.get('password').value.set(null);
      });
    }
  }

  get formControls() {
    return this.authForm.controls;
  }

  onDisconnect() {
    this.disconnect.emit();
  }
}
