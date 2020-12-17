import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import * as drawerActions from '../actions/drawer.action';
import { DrawerActionService } from '../../services/drawer-action.service';
import { FontService } from '../../services/font.service';

@Injectable()
export class DrawerEffect {
  constructor(
    private actions$: Actions,
    private drawerActionService: DrawerActionService,
    private fontService: FontService
  ) {}

  fechDrawerActions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(drawerActions.FetchDrawerActions.type),
      mergeMap(() =>
        this.drawerActionService
          .getAllDrawerActions()
          .pipe(
            map((actions) =>
              drawerActions.FetchDrawerActionsSuccess({ actions: actions })
            )
          )
      )
    )
  );

  fechFontNames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(drawerActions.FetchFontNames.type),
      mergeMap(() =>
        this.fontService
          .getAllFonts()
          .pipe(
            map((fontNames) =>
              drawerActions.FetchFontNamesSuccess({ fontNames: fontNames })
            )
          )
      )
    )
  );
}
