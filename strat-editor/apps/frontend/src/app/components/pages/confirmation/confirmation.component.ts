import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as StratStore from '@strat-editor/store';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'strat-editor-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  public $httpError: Observable<HttpErrorResponse>;
  constructor(
    private route: ActivatedRoute,
    private store: Store<StratStore.StratEditorState>
  ) {}

  ngOnInit(): void {
    this.$httpError = this.store.select(StratStore.getAuthError);
    this.route.params.subscribe((params) => {
      if (params.token) {
        this.store.dispatch(StratStore.ConfirmEmail({ token: params.token }));
      }
    });
  }
}
