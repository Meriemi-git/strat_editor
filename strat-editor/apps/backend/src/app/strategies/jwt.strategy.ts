import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
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
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: JwtStrategy.cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtInfos): Promise<User> {
    return this.userService
      .verifyToken(payload)
      .then((user) => {
        if (user) {
          if (user.confirmed) {
            return Promise.resolve(user);
          } else {
            throw new PreconditionFailedException(
              'Please confirm your email first'
            );
          }
        } else {
          throw new UnauthorizedException();
        }
      })
      .catch((error) => {
        throw new UnauthorizedException();
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
