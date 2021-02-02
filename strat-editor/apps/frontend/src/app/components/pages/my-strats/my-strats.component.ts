import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Strat, UserInfos } from '@strat-editor/data';
import { Observable } from 'rxjs';
import * as StratStore from '@strat-editor/store';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.$strats = this.store.select(StratStore.selectAllStrats);
    this.$userInfos = this.store.select(StratStore.getUserInfos);
    this.$userInfos.subscribe((userInfos) => {
      if (userInfos) {
        this.store.dispatch(
          StratStore.GetMyStrats({ userId: userInfos.userId })
        );
      }
    });
  }

  onFilterStrat(filters: any) {
    this.$strats.pipe(map((strats) => this.filter(strats, filters)));
  }

  private filter(strats: Strat[], filters: any): Strat[] {
    return strats;
  }

  onSelectStrat(strat: Strat) {
    this.store.dispatch(StratStore.LoadStrat({ strat }));
    this.router.navigateByUrl('editor');
  }
  onUpVoteStrat(strat: Strat) {}
  onUDeleteStrat(strat: Strat) {}
}
