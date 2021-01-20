import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfos } from '@strat-editor/data';
import { Observable } from 'rxjs';

@Component({
  selector: 'strat-editor-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  @Input() $userInfos: Observable<UserInfos>;
  @Output() disconnect = new EventEmitter<void>();
  public userInfos: UserInfos;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.$userInfos.subscribe((userInfos) => {
      this.userInfos = userInfos;
    });
  }

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
