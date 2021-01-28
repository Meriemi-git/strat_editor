import { HttpErrorResponse } from '@angular/common/http';
import { UserInfos } from '@strat-editor/data';

export interface UserState {
  userInfos: UserInfos;
  error: HttpErrorResponse;
}
