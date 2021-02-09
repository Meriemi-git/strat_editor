import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import * as StratStore from '@strat-editor/store';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'strat-editor-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit, OnDestroy {
  public $httpError: Observable<HttpErrorResponse>;
  private unsubscriber = new Subject();

  constructor(
    private route: ActivatedRoute,
    private store: Store<StratStore.StratEditorState>
  ) {}

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  ngOnInit(): void {
    this.$httpError = this.store.select(StratStore.getAuthError);
    this.route.params.pipe(takeUntil(this.unsubscriber)).subscribe((params) => {
      if (params.token) {
        this.store.dispatch(StratStore.ConfirmEmail({ token: params.token }));
      }
    });
  }
}
