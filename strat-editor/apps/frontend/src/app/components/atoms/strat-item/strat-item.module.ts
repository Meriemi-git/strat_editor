import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { StratItemComponent } from './strat-item.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [StratItemComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule],
  exports: [StratItemComponent],
})
export class StratItemModule {}
