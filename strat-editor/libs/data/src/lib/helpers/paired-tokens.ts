import { RefreshToken } from '../entities';
import { AuthToken } from './auth-token';

export interface PairedTokens {
  jwtId: string;
  authToken: AuthToken;
  refreshToken: RefreshToken;
}
