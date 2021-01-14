import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { RegisterFormModule } from '../../atoms/register-form/register-form.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    RegisterFormModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [RegisterComponent],
})
export class RegisterModule {}
