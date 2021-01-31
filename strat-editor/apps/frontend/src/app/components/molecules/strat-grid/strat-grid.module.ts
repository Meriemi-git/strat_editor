import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StratGridComponent } from './strat-grid.component';
import { StratItemModule } from '../../atoms/strat-item/strat-item.module';

@NgModule({
  declarations: [StratGridComponent],
  imports: [CommonModule, StratItemModule],
  exports: [StratGridComponent],
})
export class StratGridModule {}
