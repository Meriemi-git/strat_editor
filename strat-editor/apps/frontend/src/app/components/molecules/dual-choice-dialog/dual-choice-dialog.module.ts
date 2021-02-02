import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DualChoiceDialogComponent } from './dual-choice-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DualChoiceDialogComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [DualChoiceDialogComponent],
})
export class StratSavingDialogModule {}
