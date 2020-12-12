import * as Ngx from '@angular-material-components/color-picker';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';

import {
  RectangleAction,
  DrawerAction,
  TriangleAction,
  PolyLineAction,
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
export class DrawingPanelComponent implements OnInit, AfterViewInit {
  @Output() actionSelected = new EventEmitter<DrawerAction>();
  @Output() colorSelected = new EventEmitter<Color>();
  @Input() color: Color;

  shapeActions: DrawerAction[] = [];
  formActions: DrawerAction[] = [];
  textActions: DrawerAction[] = [];
  toolActions: DrawerAction[] = [];

  @ViewChild(Ngx.NgxMatColorPickerInput)
  pickerInput: Ngx.NgxMatColorPickerInput;

  colorCtr: AbstractControl = new FormControl('');

  constructor() {
    this.shapeActions.push(new LineAction());
    this.shapeActions.push(new ArrowAction());
    this.shapeActions.push(new TriangleAction());
    this.shapeActions.push(new RectangleAction());
    this.shapeActions.push(new OvalAction());
    this.shapeActions.push(new PolyLineAction());

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

  ngAfterViewInit(): void {}

  onSelectColor(event: any) {
    let color = new Color();
    console.log('event', event);
    Object.assign(color, event);
    this.colorSelected.emit(color);
    console.log('color', color);
  }

  onActionSelected(action: DrawerAction) {
    this.actionSelected.emit(action);
  }

  getNgxColor(): Ngx.Color {
    return new Ngx.Color(
      this.color.r,
      this.color.g,
      this.color.b,
      this.color.a
    );
  }
  // (ngModelChange)="onSelectColor($event)"
  //     [value]="getNgxColor()"
}
