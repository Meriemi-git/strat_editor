import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  Logger,
  PreconditionFailedException,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { jwtConstants } from './constants';
import { UserService } from '../api/user/user.service';
import { AuthToken, User } from '@strat-editor/data';
import { Request } from 'express';

@Injectable()
export class ConfirmedStrategy extends PassportStrategy(
  Strategy,
  'ConfirmedStrategy'
) {
  private readonly logger = new Logger(ConfirmedStrategy.name);

  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ConfirmedStrategy.cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: AuthToken): Promise<User> {
    this.logger.debug('User token validation');
    const refreshToken = req.cookies['X-REFRESH-TOKEN'];
    return this.userService
      .getUserFromToken(payload, refreshToken)
      .then((user) => {
        if (user) {
          if (user.confirmed) {
            this.logger.debug('User pass ConfirmedStrategy');
            return Promise.resolve(user);
          } else {
            this.logger.debug('Account not verified');
            throw new PreconditionFailedException(
              'Please confirm your email first'
            );
          }
        } else {
          this.logger.debug('Unknown user');
          throw new UnauthorizedException();
        }
      })
      .catch((error) => {
        this.logger.error('Error from verify token');
        throw error;
      });
  }

  static cookieExtractor(@Req() req: Request) {
    var token = null;
    if (req && req.cookies) {
      token = req.cookies['X-AUTH-TOKEN'];
    }
    return token;
  }
}
