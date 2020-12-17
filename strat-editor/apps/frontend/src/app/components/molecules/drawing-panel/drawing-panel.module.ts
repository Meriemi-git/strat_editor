import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawingPanelComponent } from './drawing-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DrawingActionModule } from '../../atoms/drawing-action/drawing-action.module';
import { MatSelectModule } from '@angular/material/select';
import {
  MAT_COLOR_FORMATS,
  NgxMatColorPickerModule,
  NGX_MAT_COLOR_FORMATS,
} from '@angular-material-components/color-picker';
import { SharedModule } from '../../../shared.module';

@NgModule({
  declarations: [DrawingPanelComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMatColorPickerModule,
    DrawingActionModule,
    SharedModule,
    MatSelectModule,
  ],
  providers: [{ provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }],
  exports: [DrawingPanelComponent],
})
export class DrawingPanelModule {}
