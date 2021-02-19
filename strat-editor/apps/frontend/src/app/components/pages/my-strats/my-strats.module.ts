import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyStratsRoutingModule } from './my-strats-routing.module';
import { MyStratsComponent } from './my-strats.component';
import { StratFiltersModule } from '../../molecules/strat-filters/strat-filters.module';
import { StratGridModule } from '../../molecules/strat-grid/strat-grid.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [MyStratsComponent],
  imports: [
    CommonModule,
    MyStratsRoutingModule,
    StratFiltersModule,
    StratGridModule,
    MatPaginatorModule,
    MatExpansionModule,
  ],
  exports: [MyStratsComponent],
})
export class MyStratsModule {}
