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
      expiresIn: '30s',
    });
    const refreshToken = await this.generateRefreshToken(user, jwtUid);
    console.log('refreshToken', refreshToken);
    const refreshTokenEncrypted = this.jwtService.sign(refreshToken, {
      jwtid: jwtUid,
      expiresIn: '1d',
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
      userId: user._id,
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
    const authTokenEncrypted = request.cookies['X-AUTH-TOKEN'];
    const refreshTokenEncrypted = request.cookies['X-REFRESH-TOKEN'];
    const jwtInfosVerify = this.jwtService.verify(authTokenEncrypted);
    console.log('jwtInfosVerify', jwtInfosVerify);
    const refreshTokenVerify = this.jwtService.verify(authTokenEncrypted);
    console.log('refreshToken', refreshTokenVerify);
    const jwtInfos = this.jwtService.decode(authTokenEncrypted);
    const refreshToken = this.jwtService.decode(refreshTokenEncrypted);
    return this.refreshTokenIsValid(jwtInfos, refreshToken).then((isValid) => {
      if (isValid) {
        this.userService.findUserById(refreshToken['userId']);
        Promise.resolve();
      }
    });

    return Promise.resolve({});
  }

  async refreshTokenIsValid(jwtInfos, refreshToken): Promise<boolean> {
    if (jwtInfos['jwtId'] !== refreshToken['jwtId']) {
      return false;
    }
    this.refreshTokenModel
      .findOne({ jwtid: refreshToken['jwtId'] })
      .exec()
      .then((existingRToken) => {
        if (existingRToken && !existingRToken.invalidate) {
          Promise.resolve(true);
        } else {
          Promise.resolve(false);
        }
      });
  }

  invalidateTokens(request: any) {
    throw new Error('Method not implemented.');
  }
}
