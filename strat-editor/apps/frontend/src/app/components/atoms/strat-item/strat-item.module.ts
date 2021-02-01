import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { StratItemComponent } from './strat-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [StratItemComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  exports: [StratItemComponent],
})
export class StratItemModule {}
