import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShapeWidgetComponent } from './shape-widget.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { MatInputModule } from '@angular/material/input';
import { IconWidgetModule } from '../../atoms/icon-widget/icon-widget.module'

@NgModule({
  declarations: [ShapeWidgetComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    NgxMatColorPickerModule,
    IconWidgetModule
  ],
  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
  ],
  exports:[ShapeWidgetComponent]
})
export class ShapeWidgetModule {

}
