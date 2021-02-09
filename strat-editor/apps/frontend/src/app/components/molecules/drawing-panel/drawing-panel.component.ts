import * as Ngx from '@angular-material-components/color-picker';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as StratStore from '@strat-editor/store';
import { Observable, Subject } from 'rxjs';
import {
  DrawerActionType,
  DrawerColor,
  DrawerAction,
} from '@strat-editor/data';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'strat-editor-drawing-panel',
  templateUrl: './drawing-panel.component.html',
  styleUrls: ['./drawing-panel.component.scss'],
})
export class DrawingPanelComponent implements OnInit, OnDestroy {
  public $color: Observable<DrawerColor>;
  public $drawerActions: Observable<DrawerAction[]>;
  public $fontNames: Observable<string[]>;

  public fontSizes: number[];
  public DrawingActionType: typeof DrawerActionType = DrawerActionType;

  @ViewChild(Ngx.NgxMatColorPickerInput)
  pickerInput: Ngx.NgxMatColorPickerInput;

  public colorCtr: AbstractControl = new FormControl('');
  public selectedSize: number;
  public selectedFont: string;
  private unsubscriber = new Subject();

  constructor(private store: Store<StratStore.StratEditorState>) {
    this.fontSizes = Array(100)
      .fill(0)
      .map((x, i) => i + 1);
  }
  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  ngOnInit(): void {
    this.$color = this.store.select(StratStore.getColor);
    this.$drawerActions = this.store.select(StratStore.selectAllDrawerActions);
    this.$fontNames = this.store.select(StratStore.getFontNames);
    this.store
      .select(StratStore.getFontFamily)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((font) => (this.selectedFont = font));
    this.store
      .select(StratStore.getFontSize)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((size) => (this.selectedSize = size));
  }

  onSelectColor(event: any) {
    let color = new DrawerColor();
    Object.assign(color, event);
    this.store.dispatch(StratStore.SetColor({ color }));
  }

  onActionSelected(action: DrawerAction) {
    if (action.type !== DrawerActionType.SETTING) {
      this.store.dispatch(StratStore.SetDrawerAction({ action }));
    } else {
      this.store.dispatch(StratStore.SetOptions({ optionAction: action }));
    }
  }

  onFontFamilySelected(font: string) {
    this.store.dispatch(StratStore.SetFontFamily({ fontFamily: font }));
  }

  onFontSizeSelected(fontSize: number) {
    this.store.dispatch(StratStore.SetFontSize({ fontSize }));
  }

  getNgxColor(color: DrawerColor): Ngx.Color {
    return new Ngx.Color(color.r, color.g, color.b, color.a);
  }
}
