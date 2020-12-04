import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'strat-editor-shape-widget',
  templateUrl: './shape-widget.component.html',
  styleUrls: ['./shape-widget.component.scss']
})
export class ShapeWidgetComponent {
  shapeSelector = new FormControl();

  shapetypes: string[] = ['Line', 'Triangle', 'Rectangle', 'Polygon'];
}
