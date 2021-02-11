import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Strat, UserInfos } from '@strat-editor/data';
import { Observable } from 'rxjs';
import * as StratStore from '@strat-editor/store';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  DualChoiceDialogComponent,
  DualChoiceDialogData,
} from '../../molecules/dual-choice-dialog/dual-choice-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'strat-editor-my-strats',
  templateUrl: './my-strats.component.html',
  styleUrls: ['./my-strats.component.scss'],
})
export class MyStratsComponent implements OnInit {
  public $strats: Observable<Strat[]>;
  public $userInfos: Observable<UserInfos>;

  constructor(
    private store: Store<StratStore.StratEditorState>,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.$strats = this.store.select(StratStore.selectAllStrats);
    this.$userInfos = this.store.select(StratStore.getUserInfos);
    this.store.dispatch(StratStore.GetMyStrats());
  }

  onFilterStrat(filters: any) {
    this.$strats.pipe(map((strats) => this.filter(strats, filters)));
  }

  private filter(strats: Strat[], filters: any): Strat[] {
    return strats;
  }

  onSelectStrat(strat: Strat) {
    this.store.dispatch(StratStore.LoadStratSuccess({ strat }));
    this.router.navigateByUrl('editor/' + strat._id);
  }

  onUpVoteStrat(strat: Strat) {}

  onDeleteStrat(strat: Strat) {
    console.log('delete strat');
    const dialogRef = this.dialog.open(DualChoiceDialogComponent, {
      width: '400px',
      hasBackdrop: true,
      data: {
        title: 'Deleting strat',
        description: ['Do you really want to delete this strat :', strat.name],
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Delete',
      } as DualChoiceDialogData,
      panelClass: ['strat-saving-dialog'],
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.store.dispatch(StratStore.DeleteStrat({ stratId: strat._id }));
      }
    });
  }
}
