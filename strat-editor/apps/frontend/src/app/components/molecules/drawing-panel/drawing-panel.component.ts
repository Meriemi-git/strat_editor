import * as Ngx from '@angular-material-components/color-picker';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  DrawerColor,
  DrawerAction,
  DrawerActionType,
} from '@strat-editor/drawing-editor';
import { StratEditorState } from '../../../store/reducers';
import * as Actions from '../../../store/actions';
import * as Selectors from '../../../store/selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'strat-editor-drawing-panel',
  templateUrl: './drawing-panel.component.html',
  styleUrls: ['./drawing-panel.component.scss'],
})
export class DrawingPanelComponent implements OnInit {
  $color: Observable<DrawerColor>;
  $drawerActions: Observable<DrawerAction[]>;
  $fontNames: Observable<string[]>;
  $isDrawingPanelOpened: Observable<boolean>;
  $isGalleryPanelOpened: Observable<boolean>;
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
    this.$isDrawingPanelOpened = this.store.select(
      Selectors.isDrawingPanelOpened
    );
    this.$isGalleryPanelOpened = this.store.select(
      Selectors.isGalleryPanelOpened
    );
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
