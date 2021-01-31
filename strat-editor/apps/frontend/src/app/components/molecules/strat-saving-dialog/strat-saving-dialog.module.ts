import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StratSavingDialogComponent } from './strat-saving-dialog.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [StratSavingDialogComponent],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  exports: [StratSavingDialogComponent],
})
export class StratSavingDialogModule {}
