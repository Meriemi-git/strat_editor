import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StratInfosComponent } from './strat-infos.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [StratInfosComponent],
  imports: [CommonModule, MatListModule, MatCardModule],
  exports: [StratInfosComponent],
})
export class StratInfosModule {}
