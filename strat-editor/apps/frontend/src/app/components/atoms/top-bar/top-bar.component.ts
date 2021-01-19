import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthInfos, UserInfos } from '@strat-editor/data';
import { Observable } from 'rxjs';

@Component({
  selector: 'strat-editor-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  @Input() $userInfos: Observable<UserInfos>;
  @Output() disconnect = new EventEmitter<void>();
  constructor(private router: Router) {}

  onAccountClick() {
    this.router.navigateByUrl('/account');
  }
  onDisconnectClick() {
    this.disconnect.emit();
  }

  onLoginClick() {
    this.router.navigateByUrl('/login');
  }

  onRegisterClick() {
    this.router.navigateByUrl('/register');
  }

  onHomeClick() {
    this.router.navigateByUrl('/');
  }
}
