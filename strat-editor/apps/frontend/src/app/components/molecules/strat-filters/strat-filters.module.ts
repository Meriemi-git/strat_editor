import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StratFiltersComponent } from './strat-filters.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [StratFiltersComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
  ],
  exports: [StratFiltersComponent],
})
export class StratFiltersModule {}
