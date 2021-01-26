import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, Req, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { UserService } from '../api/user/user.service';
import { JwtInfos, User } from '@strat-editor/data';
import { Request } from 'express';

@Injectable()
export class RegisteredStrategy extends PassportStrategy(
  Strategy,
  'RegisteredStrategy'
) {
  private readonly logger = new Logger(RegisteredStrategy.name);

  constructor(private userService: UserService) {
    super({
      jwtFromRequest: RegisteredStrategy.cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtInfos): Promise<User> {
    this.logger.debug('User token validation');
    return this.userService
      .verifyToken(payload)
      .then((user) => {
        if (user) {
          this.logger.debug('User pass RegisteredStrategy');
          return Promise.resolve(user);
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
