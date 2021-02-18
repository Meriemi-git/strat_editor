import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  AuthInfos,
  AuthToken,
  PairedTokens,
  RefreshToken,
  RefreshTokenDocument,
  User,
  UserDto,
} from '@strat-editor/data';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @InjectModel('RefreshToken')
    private refreshTokenModel: Model<RefreshTokenDocument>,
    private userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  public async login(userDto: UserDto): Promise<AuthInfos> {
    return this.validateUser(userDto).then((user) => {
      if (!user) {
        this.logger.debug('User was not validated');
        throw new UnauthorizedException();
      }
      return this.generateTokenAndRefreshToken(user);
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
                  this.logger.debug("Passwords doesn't match");
                  reject(new UnauthorizedException('Wrong credentials'));
                }
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            this.logger.debug('User was not found for this mail');
            reject(new UnauthorizedException('Wrong credentials'));
          }
        })
        .catch((error) => {
          return error;
        });
    });
  }

  async refresh(request: Request): Promise<AuthInfos> {
    this.logger.debug('refresh');
    const xAuthToken = request.cookies['X-AUTH-TOKEN'];
    const xRefreshToken = request.cookies['X-REFRESH-TOKEN'];
    const pairedTokens = this.decodeTokens(xAuthToken, xRefreshToken);
    if (pairedTokens == null) {
      this.logger.debug('Tokens decoding failed');
      throw new BadRequestException('Tokens are invalid');
    }
    try {
      // AuthToken is expired, try to get the user who own this refreshToken
      return this.userService
        .findUserById(pairedTokens.refreshToken.userId)
        .then((user) => {
          if (user) {
            this.logger.debug('User found');
            return this.isRefreshTokenValid(pairedTokens.refreshToken).then(
              (isValid) => {
                if (isValid) {
                  const xAuthToken = this.generateAuthToken(
                    user,
                    pairedTokens.jwtId
                  );
                  const authInfos = this.createAuthInfos(
                    xAuthToken,
                    xRefreshToken,
                    user
                  );
                  return Promise.resolve(authInfos);
                } else {
                  this.logger.debug('RefreshToken is not Valid');
                  throw new BadRequestException('You must log in');
                }
              }
            );
          } else {
            this.logger.debug('User nor found');
            throw new BadRequestException('You must log in');
          }
        });
    } catch (error) {
      throw new BadRequestException('You must log in');
    }
  }

  isRefreshTokenValid(refreshToken: RefreshToken): Promise<boolean> {
    return this.refreshTokenModel
      .findOne({ _id: refreshToken._id })
      .exec()
      .then((refreshToken) => {
        return refreshToken != null;
      });
  }

  private decodeTokens(xAuthToken: any, xRefreshToken: any): PairedTokens {
    try {
      const authToken = this.jwtService.decode(xAuthToken);
      const refreshToken = this.jwtService.verify(xRefreshToken);
      if (authToken['jti'] === refreshToken['jti']) {
        return {
          authToken: {
            userId: authToken['userId'],
            userMail: authToken['userMail'],
          },
          refreshToken: {
            _id: refreshToken['_id'],
            userId: refreshToken['userId'],
            creationDate: refreshToken['creationDate'],
          },
          jwtId: authToken['jti'],
        };
      } else {
        this.logger.debug('Tokens were not paired');
        return null;
      }
    } catch (error) {
      this.logger.debug('Tokens were invalid');
      const refreshToken = this.jwtService.decode(xRefreshToken);
      this.revokeRefreshToken(refreshToken['_id']);
      return null;
    }
  }
  private revokeRefreshToken(refreshTokenId: string): Promise<any> {
    this.logger.debug('Revokation of refrehToken');
    return this.refreshTokenModel
      .findOneAndRemove({ _id: refreshTokenId })
      .exec();
  }

  private createAuthInfos(
    authToken: string,
    refreshToken: string,
    user: User
  ): AuthInfos {
    return {
      authToken: authToken,
      refreshToken: refreshToken,
      userInfos: this.userService.getUserInfos(user),
    } as AuthInfos;
  }

  async generateTokenAndRefreshToken(user: User): Promise<AuthInfos> {
    const jwtId = uuid().toString();
    return await this.generateRefreshToken(user, jwtId).then(
      (refreshTokenEncrypted) => {
        const userInfos = this.userService.getUserInfos(user);
        const authTokenEncrypted = this.generateAuthToken(user, jwtId);
        return {
          userInfos,
          authToken: authTokenEncrypted,
          refreshToken: refreshTokenEncrypted,
        } as AuthInfos;
      }
    );
  }

  generateAuthToken(user: User, jwtId: string): string {
    const payload: AuthToken = { userId: user._id, userMail: user.mail };
    return this.jwtService.sign(payload, {
      jwtid: jwtId,
      expiresIn: '10s',
    });
  }

  async generateRefreshToken(user: User, jwtUid: string): Promise<string> {
    const payload: RefreshToken = {
      userId: user._id,
      creationDate: new Date(),
    };
    const createdRefreshToken = new this.refreshTokenModel(payload);
    return createdRefreshToken.save().then((refreshToken) => {
      payload._id = refreshToken._id;
      return this.jwtService.sign(payload, {
        jwtid: jwtUid,
        expiresIn: '1d',
      });
    });
  }

  invalidateTokens(request: any) {
    const refreshToken = this.jwtService.decode(
      request.cookies['X-REFRESH-TOKEN']
    );
    if (refreshToken) {
      this.revokeRefreshToken(refreshToken['_id']);
    }
  }

  public getUserIdFromRequest(request: Request) {
    const xAuthToken = request.cookies['X-AUTH-TOKEN'];
    try {
      const jwtInfos = this.jwtService.decode(xAuthToken);
      return jwtInfos['userId'];
    } catch (error) {
      this.logger.debug('Error in getUserIdFromCookies');
      return null;
    }
  }
}
