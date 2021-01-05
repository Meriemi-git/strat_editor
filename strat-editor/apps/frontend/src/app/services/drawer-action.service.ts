import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  ArrowAction,
  BoldAction,
  DraggingAction,
  DrawerAction,
  ItalicAction,
  LineAction,
  LocationAction,
  OvalAction,
  PictureAction,
  PolyLineAction,
  RectangleAction,
  SelectionAction,
  StarAction,
  TextAction,
  TimeAction,
  TriangleAction,
  UnderlineAction,
  VideoAction,
} from '@strat-editor/drawing-editor';

@Injectable({
  providedIn: 'root',
})
export class DrawerActionService {
  actions: DrawerAction[] = [];
  constructor() {
    this.actions.push(new LineAction());
    this.actions.push(new ArrowAction());
    this.actions.push(new TriangleAction());
    this.actions.push(new RectangleAction());
    this.actions.push(new OvalAction());
    this.actions.push(new PolyLineAction());

    this.actions.push(new StarAction());
    this.actions.push(new TimeAction());
    this.actions.push(new LocationAction());

    this.actions.push(new TextAction());
    this.actions.push(new UnderlineAction());
    this.actions.push(new BoldAction());
    this.actions.push(new ItalicAction());

    this.actions.push(new PictureAction());
    this.actions.push(new VideoAction());
    this.actions.push(new SelectionAction());
    this.actions.push(new DraggingAction());
  }

  getAllDrawerActions(): Observable<DrawerAction[]> {
    return of(this.actions);
  }
}
