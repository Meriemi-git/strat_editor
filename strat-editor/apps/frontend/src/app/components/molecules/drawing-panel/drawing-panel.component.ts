import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'strat-editor-drawing-panel',
  templateUrl: './drawing-panel.component.html',
  styleUrls: ['./drawing-panel.component.scss']
})
export class DrawingPanelComponent {

  @Output() actionCalled = new EventEmitter<string>();

  shapeSelector = new FormControl();
  colorCtr: AbstractControl = new FormControl(null);
  public color: ThemePalette = 'primary';

  OnIconClicked(iconName : string){
    this.actionCalled.emit(iconName);
  }

}
