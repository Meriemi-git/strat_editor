import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'strat-editor-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  @Input() username: string;
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
