import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthentService } from '../../../services/authent.service';

@Component({
  selector: 'strat-editor-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthentService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.authService
        .confirmEmail(params.token)
        .pipe(
          catchError((err) => {
            console.log(err);
            return throwError(err);
          })
        )
        .subscribe((result) => {
          console.log('Email confirmed !', result);
        });
    });
  }
}
