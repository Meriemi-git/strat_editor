import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoModalComponent } from './info-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [InfoModalComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  exports: [InfoModalComponent],
})
export class InfoModalModule {}
