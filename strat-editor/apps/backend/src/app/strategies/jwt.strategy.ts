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
import { UserService } from '../user/user.service';
import { JwtInfos, User } from '@strat-editor/data';
import { Request } from 'express';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(private userService: UserService) {
    super({
      jwtFromRequest: JwtStrategy.cookieExtractor,
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
          if (user.confirmed) {
            this.logger.debug('User pass jwtStrategy');
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
        this.logger.error('Erro from verify token');
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
