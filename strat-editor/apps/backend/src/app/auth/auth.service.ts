import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    console.log('In login');
    return this.validateUser(user).then((userData) => {
      console.log('In validateUser promise then');
      if (!userData) {
        console.log('Not user Data');
        return { status: 404 };
      }
      let payload = `${userData.mail}${userData.id}`;
      const accessToken = this.jwtService.sign(payload);
      return {
        expires_in: 3600,
        access_token: accessToken,
        user_id: payload,
        status: 200,
      };
    });
  }

  public async register(user: User): Promise<any> {
    return this.userService.addUser(user);
  }

  public async validateUser(user: User): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.userService.findOne(user.mail).then((matchingUser) => {
        if (matchingUser) {
          console.log('user.password', user.password);
          console.log('matchingUser.password', matchingUser.password);

          bcrypt
            .compare(user.password, matchingUser.password)
            .then((matching) => {
              console.log('matching', matching);
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
