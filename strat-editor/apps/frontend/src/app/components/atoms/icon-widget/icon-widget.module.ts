import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconWidgetComponent } from './icon-widget.component';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [IconWidgetComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports : [IconWidgetComponent]
})
export class IconWidgetModule { }
