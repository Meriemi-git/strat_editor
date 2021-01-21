import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthentService } from '../../../services/authent.service';
import { StratEditorState } from '../../../store/reducers';
import * as Actions from '../../../store/actions';
import * as Selectors from '../../../store/selectors';
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
    private store: Store<StratEditorState>
  ) {}

  ngOnInit(): void {
    this.$httpError = this.store.select(Selectors.getAuthError);
    this.route.params.subscribe((params) => {
      if (params.token) {
        this.store.dispatch(Actions.ConfirmEmail({ token: params.token }));
      }
    });
  }
}
