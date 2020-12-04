import { Component } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';


@Component({
  selector: 'strat-editor-shape-widget',
  templateUrl: './shape-widget.component.html',
  styleUrls: ['./shape-widget.component.scss']
})
export class ShapeWidgetComponent {
  shapeSelector = new FormControl();
  colorCtr: AbstractControl = new FormControl(null);
  public color: ThemePalette = 'primary';

}
