import * as Ngx from '@angular-material-components/color-picker';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { StratEditorState } from '@strat-editor/store';
import * as Actions from '@strat-editor/store';
import * as Selectors from '@strat-editor/store';
import { Observable } from 'rxjs';
import {
  DrawerActionType,
  DrawerColor,
  DrawerAction,
} from '@strat-editor/data';

@Component({
  selector: 'strat-editor-drawing-panel',
  templateUrl: './drawing-panel.component.html',
  styleUrls: ['./drawing-panel.component.scss'],
})
export class DrawingPanelComponent implements OnInit {
  $color: Observable<DrawerColor>;
  $drawerActions: Observable<DrawerAction[]>;
  $fontNames: Observable<string[]>;

  fontSizes: number[];
  DrawingActionType: typeof DrawerActionType = DrawerActionType;

  @ViewChild(Ngx.NgxMatColorPickerInput)
  pickerInput: Ngx.NgxMatColorPickerInput;

  colorCtr: AbstractControl = new FormControl('');
  selectedSize: number;
  selectedFont: string;
  constructor(private store: Store<StratEditorState>) {
    this.fontSizes = Array(100)
      .fill(0)
      .map((x, i) => i + 1);
  }

  ngOnInit(): void {
    this.$color = this.store.select(Selectors.getColor);
    this.$drawerActions = this.store.select(Selectors.selectAllDrawerActions);
    this.$fontNames = this.store.select(Selectors.getFontNames);
    this.store
      .select(Selectors.getFontFamily)
      .subscribe((font) => (this.selectedFont = font));
    this.store
      .select(Selectors.getFontSize)
      .subscribe((size) => (this.selectedSize = size));
  }

  onSelectColor(event: any) {
    let color = new DrawerColor();
    Object.assign(color, event);
    this.store.dispatch(Actions.SetColor({ color }));
  }

  onActionSelected(action: DrawerAction) {
    if (action.type !== DrawerActionType.SETTING) {
      this.store.dispatch(Actions.SetDrawerAction({ action }));
    } else {
      this.store.dispatch(Actions.SetOptions({ optionAction: action }));
    }
  }

  onFontFamilySelected(font: string) {
    this.store.dispatch(Actions.SetFontFamily({ fontFamily: font }));
  }

  onFontSizeSelected(fontSize: number) {
    this.store.dispatch(Actions.SetFontSize({ fontSize }));
  }

  getNgxColor(color: DrawerColor): Ngx.Color {
    return new Ngx.Color(color.r, color.g, color.b, color.a);
  }
}
