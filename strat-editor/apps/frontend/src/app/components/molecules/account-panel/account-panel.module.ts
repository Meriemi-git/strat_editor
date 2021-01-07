import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountPanelComponent } from './account-panel.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [AccountPanelComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  exports: [AccountPanelComponent],
})
export class AccountPanelModule {}
