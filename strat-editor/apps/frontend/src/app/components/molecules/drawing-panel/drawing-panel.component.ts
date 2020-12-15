import * as Ngx from '@angular-material-components/color-picker';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  Color,
  DrawerAction,
  DrawingActionType,
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
  $color: Observable<Color>;
  $drawerActions: Observable<DrawerAction[]>;
  DrawingActionType: typeof DrawingActionType = DrawingActionType;

  @ViewChild(Ngx.NgxMatColorPickerInput)
  pickerInput: Ngx.NgxMatColorPickerInput;

  colorCtr: AbstractControl = new FormControl('');

  constructor(private store: Store<StratEditorState>) {}

  ngOnInit(): void {
    this.$color = this.store.select(Selectors.getColor);
    this.$drawerActions = this.store.select(Selectors.selectAllDrawerActions);
  }

  ngAfterViewInit(): void {}

  onSelectColor(event: any) {
    let color = new Color();
    Object.assign(color, event);
    this.store.dispatch(Actions.SetColorAction({ color }));
  }

  onActionSelected(action: DrawerAction) {
    if (action.type !== DrawingActionType.SETTING) {
      this.store.dispatch(Actions.PerformDrawerAction({ action }));
    } else {
      this.store.dispatch(Actions.SetDrawerOptions({ options: action }));
    }
  }

  getNgxColor(color: Color): Ngx.Color {
    return new Ngx.Color(color.r, color.g, color.b, color.a);
  }
}
