import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

import {
  RectangleAction,
  DrawerAction,
  TriangleAction,
  CurveAction,
  EraserAction,
  GroupAction,
  LocationAction,
  PictureAction,
  SelectionAction,
  StarAction,
  OvalAction,
  TextAction,
  TimeAction,
  LineAction,
  UngroupAction,
  ArrowAction,
  Color,
} from '@strat-editor/drawing-editor';

@Component({
  selector: 'strat-editor-drawing-panel',
  templateUrl: './drawing-panel.component.html',
  styleUrls: ['./drawing-panel.component.scss'],
})
export class DrawingPanelComponent implements OnInit {
  @Output() actionSelected = new EventEmitter<DrawerAction>();
  @Output() colorSelected = new EventEmitter<Color>();
  shapeActions: DrawerAction[] = [];
  formActions: DrawerAction[] = [];
  textActions: DrawerAction[] = [];
  toolActions: DrawerAction[] = [];

  colorCtr: AbstractControl = new FormControl(null);
  public color: ThemePalette = 'primary';

  constructor() {
    this.shapeActions.push(new LineAction());
    this.shapeActions.push(new ArrowAction());
    this.shapeActions.push(new TriangleAction());
    this.shapeActions.push(new RectangleAction());
    this.shapeActions.push(new OvalAction());
    this.shapeActions.push(new CurveAction());

    this.formActions.push(new StarAction());
    this.formActions.push(new TimeAction());
    this.formActions.push(new LocationAction());

    this.textActions.push(new TextAction());

    this.toolActions.push(new UngroupAction());
    this.toolActions.push(new EraserAction());
    this.toolActions.push(new GroupAction());
    this.toolActions.push(new PictureAction());
    this.toolActions.push(new SelectionAction());
  }
  ngOnInit(): void {}

  onSelectColor(event: any) {
    let color = new Color();
    Object.assign(color, event);
    this.colorSelected.emit(color);
  }

  onActionSelected(action: DrawerAction) {
    this.actionSelected.emit(action);
  }
}
