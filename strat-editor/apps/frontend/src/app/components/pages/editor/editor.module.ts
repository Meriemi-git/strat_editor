import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import { ImageHelperService } from '@strat-editor/drawer';
import { MapGridModule } from '../../molecules/map-grid/map-grid.module';
import { DrawerModule } from '@strat-editor/drawer';
import { EditorRoutingModule } from './editor-routing.module';
import { DrawingStatusModule } from '../../molecules/drawing-status/drawing-status.module';
import { DrawingToolbarModule } from '../../molecules/drawing-toolbar/drawing-toolbar.module';
import { StratTitleModule } from '../../atoms/strat-title/strat-title.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FloorChooserModule } from '../../molecules/floor-chooser/floor-chooser.module';
import { StratSavingDialogModule } from '../../molecules/strat-saving-dialog/strat-saving-dialog.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    MapGridModule,
    EditorRoutingModule,
    DrawerModule,
    DrawingStatusModule,
    DrawerModule,
    DrawingToolbarModule,
    StratTitleModule,
    MatDialogModule,
    FloorChooserModule,
    StratSavingDialogModule,
    MatTooltipModule,
  ],
  providers: [ImageHelperService],
  exports: [EditorComponent],
})
export class EditorModule {}
