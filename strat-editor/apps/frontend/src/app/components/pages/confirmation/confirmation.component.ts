import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'strat-editor-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log('The token of this route is: ', params.token);
      this.userService
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
