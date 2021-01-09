import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountPanelComponent } from './account-panel.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginFormModule } from '../../atoms/login-form/login-form.module';
import { RegisterFormModule } from '../../atoms/register-form/register-form.module';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [AccountPanelComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    LoginFormModule,
    RegisterFormModule,
    MatButtonModule,
  ],
  exports: [AccountPanelComponent],
})
export class AccountPanelModule {}
