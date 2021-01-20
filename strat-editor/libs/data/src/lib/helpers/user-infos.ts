import { UserRole } from './user-role';

export interface UserInfos {
  username: string;
  userMail: string;
  mailConfirmed: boolean;
  userId: string;
  stratIds: string[];
  role: UserRole;
}
