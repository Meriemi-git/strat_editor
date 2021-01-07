import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@strat-editor/data';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(user: User): Promise<any> {
    const authentificated = await this.authService.validateUser(user);
    if (!authentificated) {
      throw new UnauthorizedException();
    }
    return authentificated;
  }
}
