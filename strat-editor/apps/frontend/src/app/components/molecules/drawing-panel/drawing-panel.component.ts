import * as Ngx from '@angular-material-components/color-picker';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  DrawerColor,
  DrawerAction,
  DrawerActionType,
  FontAction,
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
export class DrawingPanelComponent implements OnInit, AfterViewInit {
  $color: Observable<DrawerColor>;
  $drawerActions: Observable<DrawerAction[]>;
  $fontNames: Observable<string[]>;
  DrawingActionType: typeof DrawerActionType = DrawerActionType;

  @ViewChild(Ngx.NgxMatColorPickerInput)
  pickerInput: Ngx.NgxMatColorPickerInput;

  colorCtr: AbstractControl = new FormControl('');

  constructor(private store: Store<StratEditorState>) {}

  ngOnInit(): void {
    this.$color = this.store.select(Selectors.getColor);
    this.$drawerActions = this.store.select(Selectors.selectAllDrawerActions);
    this.$fontNames = this.store.select(Selectors.getFontNames);
  }

  ngAfterViewInit(): void {}

  onSelectColor(event: any) {
    let color = new DrawerColor();
    Object.assign(color, event);
    this.store.dispatch(Actions.SetColor({ color }));
  }

  onActionSelected(action: DrawerAction) {
    if (action.type !== DrawerActionType.SETTING) {
      this.store.dispatch(Actions.PerformDrawerAction({ action }));
    } else {
      this.store.dispatch(Actions.SetOptions({ optionAction: action }));
    }
  }

  onFontSelected(font: string) {
    console.log('font', font);
    this.store.dispatch(Actions.SetFont({ font }));
  }

  getNgxColor(color: DrawerColor): Ngx.Color {
    return new Ngx.Color(color.r, color.g, color.b, color.a);
  }
}
