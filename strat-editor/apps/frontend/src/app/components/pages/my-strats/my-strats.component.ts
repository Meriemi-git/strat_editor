import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Strat, UserInfos } from '@strat-editor/data';
import { Observable } from 'rxjs';
import { StratEditorState } from '../../../store/reducers';
import * as Actions from '../../../store/actions';
import * as Selectors from '../../../store/selectors';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { runInThisContext } from 'vm';

@Component({
  selector: 'strat-editor-my-strats',
  templateUrl: './my-strats.component.html',
  styleUrls: ['./my-strats.component.scss'],
})
export class MyStratsComponent implements OnInit {
  public $strats: Observable<Strat[]>;
  public $userInfos: Observable<UserInfos>;

  constructor(private store: Store<StratEditorState>, private router: Router) {}

  ngOnInit(): void {
    this.$strats = this.store.select(Selectors.selectAllStrats);
    this.$userInfos = this.store.select(Selectors.getUserInfos);
    this.$userInfos.subscribe((userInfos) => {
      if (userInfos) {
        this.store.dispatch(Actions.GetMyStrats({ userId: userInfos.userId }));
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
    this.store.dispatch(Actions.EditStrat({ strat }));
    this.router.navigateByUrl('editor');
  }
  onUpVoteStrat(strat: Strat) {}
  onUDeleteStrat(strat: Strat) {}
}
