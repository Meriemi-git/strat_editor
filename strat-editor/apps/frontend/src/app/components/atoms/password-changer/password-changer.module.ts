import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordChangerComponent } from './password-changer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [PasswordChangerComponent],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  exports: [PasswordChangerComponent],
})
export class PasswordChangerModule {}
