import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { EntityState } from '@ngrx/entity';
import { DrawingMode, DrawerColor } from '@strat-editor/data';
import { DrawerAction } from '@strat-editor/drawing-editor';

export interface DrawerState extends EntityState<DrawerAction> {
  color: DrawerColor;
  drawerAction: DrawerAction | null;
  optionAction: DrawerAction | null;
  fontNames: string[];
  fontFamily: string;
  fontSize: number;
  drawingMode: DrawingMode;
}
