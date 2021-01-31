import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyStratsRoutingModule } from './my-strats-routing.module';
import { MyStratsComponent } from './my-strats.component';
import { StratFiltersModule } from '../../molecules/strat-filters/strat-filters.module';
import { StratGridModule } from '../../molecules/strat-grid/strat-grid.module';

@NgModule({
  declarations: [MyStratsComponent],
  imports: [
    CommonModule,
    MyStratsRoutingModule,
    StratFiltersModule,
    StratGridModule,
  ],
  exports: [MyStratsComponent],
})
export class MyStratsModule {}
