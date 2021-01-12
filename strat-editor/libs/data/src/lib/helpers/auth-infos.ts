import { UserInfos } from './user-infos';

export interface AuthInfos {
  userInfos?: UserInfos;
  authToken: string;
  refreshToken: string;
}
