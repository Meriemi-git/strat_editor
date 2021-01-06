import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@strat-editor/data';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  public async login(user: User): Promise<any> {
    return this.validateUser(user).then((userData) => {
      if (!userData) {
        return { status: 404 };
      }
      const payload = { user_mail: userData.mail, user_id: userData._id };
      const accessToken = this.jwtService.sign(payload);
      return {
        expires_in: 60,
        access_token: accessToken,
        user_id: userData._id,
        status: 200,
      };
    });
  }

  public async validateUser(user: User): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.userService.findByMail(user.mail).then((matchingUser) => {
        if (matchingUser) {
          bcrypt
            .compare(user.password, matchingUser.password)
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
