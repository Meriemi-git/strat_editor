import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthInfos, JwtInfos, User, UserDto } from '@strat-editor/data';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  public async login(userDto: UserDto): Promise<any> {
    return this.validateUser(userDto).then((user) => {
      if (!user) {
        throw new UnauthorizedException();
      }
      const payload: JwtInfos = { userId: user._id, userMail: user.mail };
      const accessToken = this.jwtService.sign(payload);
      return {
        username: user.username,
        expiresIn: 60,
        accessToken: accessToken,
        userId: user._id,
        mailConfirmed: user.confirmed,
      } as AuthInfos;
    });
  }

  public async validateUser(userDto: UserDto): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.userService
        .findByMail(userDto.mail.toLocaleLowerCase())
        .then((matchingUser) => {
          if (matchingUser) {
            bcrypt
              .compare(userDto.password, matchingUser.password)
              .then((matching) => {
                if (matching) {
                  resolve(matchingUser);
                } else {
                  reject(new UnauthorizedException('Wrong credentials'));
                }
              });
          } else {
            reject(new UnauthorizedException('Wrong credentials'));
          }
        });
    });
  }
}
