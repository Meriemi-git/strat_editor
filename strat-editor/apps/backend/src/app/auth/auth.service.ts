import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserDto } from '@strat-editor/data';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { AuthInfos } from '../models/auth-infos';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  public async login(userDto: UserDto): Promise<any> {
    return this.validateUser(userDto).then((user) => {
      if (!user) {
        return { status: 404 };
      }
      const payload: AuthInfos = { userId: user._id, userMail: user.mail };
      const accessToken = this.jwtService.sign(payload);
      return {
        expires_in: 60,
        access_token: accessToken,
        user_id: user._id,
        status: 200,
      };
    });
  }

  public async validateUser(userDto: UserDto): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.userService.findByMail(userDto.mail).then((matchingUser) => {
        if (matchingUser) {
          bcrypt
            .compare(userDto.password, matchingUser.password)
            .then((matching) => {
              if (matching) {
                resolve(matchingUser);
              } else {
                reject('Wrong credentials');
              }
            });
        }
      });
    });
  }
}
