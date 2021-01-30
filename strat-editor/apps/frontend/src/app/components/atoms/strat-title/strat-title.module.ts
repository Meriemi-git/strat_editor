import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StratTitleComponent } from './strat-title.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [StratTitleComponent],
  imports: [CommonModule, MatInputModule],
  exports: [StratTitleComponent],
})
export class StratTitleModule {}
