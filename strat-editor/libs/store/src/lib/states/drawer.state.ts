import { EntityState } from '@ngrx/entity';
import { DrawingMode, DrawerColor, DrawerAction } from '@strat-editor/data';

export interface DrawerState extends EntityState<DrawerAction> {
  color: DrawerColor;
  drawerAction: DrawerAction | null;
  optionAction: DrawerAction | null;
  fontNames: string[];
  fontFamily: string;
  fontSize: number;
  drawingMode: DrawingMode;
}
