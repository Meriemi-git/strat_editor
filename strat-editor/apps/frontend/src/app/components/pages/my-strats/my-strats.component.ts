import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Strat, StratFilter, UserInfos } from '@strat-editor/data';
import { Observable } from 'rxjs';
import * as StratStore from '@strat-editor/store';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  DualChoiceDialogComponent,
  DualChoiceDialogData,
} from '../../molecules/dual-choice-dialog/dual-choice-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Map } from '@strat-editor/data';

@Component({
  selector: 'strat-editor-my-strats',
  templateUrl: './my-strats.component.html',
  styleUrls: ['./my-strats.component.scss'],
})
export class MyStratsComponent implements OnInit {
  public $strats: Observable<Strat[]>;
  public userInfos: UserInfos;
  public $maps: Observable<Map[]>;
  public length: number;
  public pageSize: number = 5;
  public pageSizeOptions: number[] = [5, 10, 25, 100];
  public stratFilter: StratFilter;
  constructor(
    private store: Store<StratStore.StratEditorState>,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.$strats = this.store.select(StratStore.selectAllStrats);
    this.store.select(StratStore.getUserInfos).subscribe((userInfos) => {
      this.userInfos = userInfos;
      if (this.userInfos) {
        this.store.dispatch(
          StratStore.GetStratPage({
            pageOptions: {
              limit: this.pageSize,
              page: 1,
            },
            stratFilter: {
              favorites: false,
              userId: this.userInfos.userId,
              mapIds: [],
              order: 'asc',
              name: '',
              sortedBy: 'name',
            },
          })
        );
      }
    });
    this.$maps = this.store.select(StratStore.getAllMaps);
    this.store.dispatch(StratStore.FetchMaps());
    this.store
      .select(StratStore.getStratPageMetadata)
      .subscribe((pageMetadata) => {
        if (pageMetadata) {
          this.length = pageMetadata.totalDocs;
        }
      });
  }

  onFilterStrat(filter: StratFilter) {
    this.stratFilter = filter;
    this.store.dispatch(
      StratStore.GetStratPage({
        pageOptions: {
          limit: this.pageSize,
          page: 1,
        },
        stratFilter: {
          ...this.stratFilter,
          userId: this.userInfos.userId,
        },
      })
    );
  }

  onSelectStrat(strat: Strat) {
    this.store.dispatch(StratStore.LoadStratSuccess({ strat }));
    this.router.navigateByUrl('editor/' + strat._id);
  }

  onUpVoteStrat(strat: Strat) {}

  onDeleteStrat(strat: Strat) {
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

  public changePage(pageEvent: PageEvent) {
    this.store.dispatch(
      StratStore.GetStratPage({
        pageOptions: {
          limit: pageEvent.pageSize,
          page: pageEvent.pageIndex + 1,
        },
        stratFilter: this.stratFilter,
      })
    );
  }
}
