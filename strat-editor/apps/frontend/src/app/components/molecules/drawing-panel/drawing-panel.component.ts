import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { LineAction } from '../../../drawer/actions/line-action';
import { RectangleAction,DrawingAction, CircleAction, TriangleAction, CurveAction, EraserAction, GroupAction, LocationAction, PictureAction, SelectionAction, StarAction, ElipseAction, TextAction, TimeAction, UngroupAction } from '../../../drawer/actions';

@Component({
  selector: 'strat-editor-drawing-panel',
  templateUrl: './drawing-panel.component.html',
  styleUrls: ['./drawing-panel.component.scss']
})
export class DrawingPanelComponent {

  @Output() actionCalled = new EventEmitter<string>();
  shapeActions : DrawingAction[] = [];
  formActions : DrawingAction[] = [];
  toolActions : DrawingAction[] = [];

  shapeSelector = new FormControl();
  colorCtr: AbstractControl = new FormControl(null);
  public color: ThemePalette = 'primary';

  constructor(){
    this.shapeActions.push(new LineAction());
    this.shapeActions.push(new RectangleAction());
    this.shapeActions.push(new CircleAction());
    this.shapeActions.push(new TriangleAction());
    this.shapeActions.push(new ElipseAction());
    this.shapeActions.push(new TriangleAction());
    this.shapeActions.push(new RectangleAction());

    this.formActions.push(new StarAction());
    this.formActions.push(new TimeAction());
    this.formActions.push(new LocationAction());

    this.toolActions.push(new UngroupAction());
    this.toolActions.push(new EraserAction());
    this.toolActions.push(new GroupAction());
    this.toolActions.push(new PictureAction());
    this.toolActions.push(new TextAction());
    this.toolActions.push(new SelectionAction());

  }

  OnActionClicked(iconName : string){
    this.actionCalled.emit(iconName);
  }

}
