import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInfos } from '@strat-editor/data';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'strat-editor-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  $userInfos: Observable<UserInfos>;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userInfos: UserInfos = JSON.parse(localStorage.getItem('userInfos'));
    if (userInfos) {
      this.$userInfos = this.userService.getUserInfos(userInfos.userId).pipe(
        catchError((err) => {
          console.log('Error when getting user Infos', err);
          return throwError(err);
        })
      );
    }
  }
}
