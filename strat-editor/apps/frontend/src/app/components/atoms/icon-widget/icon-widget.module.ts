import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconWidgetComponent } from './icon-widget.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [IconWidgetComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports : [IconWidgetComponent]
})
export class IconWidgetModule { }
