import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { PasswordChangerModule } from '../../atoms/password-changer/password-changer.module';

@NgModule({
  declarations: [AccountComponent],
  imports: [CommonModule, AccountRoutingModule, PasswordChangerModule],
})
export class AccountModule {}
