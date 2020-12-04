import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShapeWidgetComponent } from './shape-widget.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ShapeWidgetComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[ShapeWidgetComponent]
})
export class ShapeWidgetModule { }
