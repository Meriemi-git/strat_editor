import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  AuthInfos,
  JwtInfos,
  RefreshToken,
  RefreshTokenDocument,
  User,
  UserDto,
} from '@strat-editor/data';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import * as moment from 'moment';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from 'express';
import { resolve } from 'url';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('RefreshToken')
    private refreshTokenModel: Model<RefreshTokenDocument>,
    private userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  public async login(userDto: UserDto): Promise<AuthInfos> {
    return this.validateUser(userDto).then((user) => {
      if (!user) {
        throw new UnauthorizedException();
      }
      const tokens = this.generateTokenAndRefreshToken(user);

      return tokens;
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

  async generateTokenAndRefreshToken(user: User): Promise<AuthInfos> {
    const jwtUid = uuid();
    const payload: JwtInfos = { userId: user._id, userMail: user.mail };

    const accessTokenEncrypted = this.jwtService.sign(payload, {
      jwtid: jwtUid,
      expiresIn: '5m',
    });
    const refreshToken = await this.generateRefreshToken(user, jwtUid);
    console.log('refreshToken', refreshToken);
    const refreshTokenEncrypted = this.jwtService.sign(refreshToken, {
      jwtid: jwtUid,
      expiresIn: '10d',
    });
    const authInfos: AuthInfos = {
      userInfos: {
        mailConfirmed: user.confirmed,
        userMail: user.mail,
        username: user.username,
      },
      authToken: accessTokenEncrypted,
      refreshToken: refreshTokenEncrypted,
    };
    return authInfos;
  }

  async generateRefreshToken(user: User, jwtId: string): Promise<RefreshToken> {
    const refeshToken: RefreshToken = {
      jwtid: jwtId,
      useriId: user._id,
      invalidated: false,
      creationDate: moment().toDate(),
      expirationDate: moment().add(10, 'd').toDate(),
    };
    const createdRefeshToken = new this.refreshTokenModel(refeshToken);
    return new Promise<RefreshToken>((resolve) => {
      createdRefeshToken.save(function (err, refreshToken) {
        resolve(refreshToken.toJSON());
      });
    });
  }

  refresh(request: Request): Promise<any> {
    const authInfos = this.decryptTokens(request);
    console.log('authToken', authInfos.authToken);
    console.log('refreshToken', authInfos.refreshToken);
    return Promise.resolve({});
  }

  invalidateTokens(request: any) {
    throw new Error('Method not implemented.');
  }

  decryptTokens(request: Request): AuthInfos {
    console.log('decryptTokens');
    console.log('request', request);
    const authTokenEncrypted = request.cookies['X-AUTH-TOKEN'];
    const refreshTokenEncrypted = request.cookies['X-REFRESH-TOKEN'];
    console.log('authTokenEncrypted', authTokenEncrypted);
    console.log('refreshTokenEncrypted', refreshTokenEncrypted);
    return {
      authToken: this.jwtService.decode(authTokenEncrypted),
      refreshToken: this.jwtService.decode(refreshTokenEncrypted),
    } as AuthInfos;
  }
}
