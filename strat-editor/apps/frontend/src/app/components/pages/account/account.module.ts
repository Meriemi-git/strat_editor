import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { PasswordChangerModule } from '../../atoms/password-changer/password-changer.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MailChangerModule } from '../../atoms/mail-changer/mail-changer.module';
@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    PasswordChangerModule,
    MatTabsModule,
    MatExpansionModule,
    MatIconModule,
    MailChangerModule,
  ],
})
export class AccountModule {}
