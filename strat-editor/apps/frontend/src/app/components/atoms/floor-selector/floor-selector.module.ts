import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloorSelectorComponent } from './floor-selector.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [FloorSelectorComponent],
  imports: [CommonModule, MatSelectModule, MatFormFieldModule],
  exports: [FloorSelectorComponent],
})
export class FloorSelectorModule {}
