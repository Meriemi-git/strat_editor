import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthInfos, JwtInfos, User, UserDto } from '@strat-editor/data';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { Request } from 'express';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
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
    const xAuthToken = request.cookies['X-AUTH-TOKEN'];
    const xRefreshToken = request.cookies['X-REFRESH-TOKEN'];
    if (!this.tokensWasPaired(xAuthToken, xRefreshToken)) {
      this.logger.debug('Tokens were not paired');
      throw new BadRequestException('Tokens are invalid');
    }
    try {
      const refreshToken = this.jwtService.verify(xRefreshToken);
      const jwtID = refreshToken['jti'].toString();
      // AuthToken is expired, try to get the user who own this refreshToken
      return this.userService
        .findUserById(refreshToken['userId'])
        .then((user) => {
          if (user) {
            // We found user so refreshToken is valid
            const xAuthToken = this.generateAuthToken(user, jwtID);
            const authInfos = this.createAuthInfos(
              xAuthToken,
              xRefreshToken,
              user
            );
            return Promise.resolve(authInfos);
          } else {
            throw new BadRequestException('You must log in');
          }
        });
    } catch (error) {
      throw new BadRequestException('You must log in');
    }
  }

  private tokensWasPaired(xAuthToken: any, xRefreshToken: any): boolean {
    try {
      const authToken = this.jwtService.decode(xAuthToken);
      const refreshToken = this.jwtService.decode(xRefreshToken);
      return authToken['jti'] === refreshToken['jti'];
    } catch (error) {
      this.logger.debug('Tokens were invalid');
      return false;
    }
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
    const authToken = this.generateAuthToken(user, jwtId);
    const refreshToken = await this.generateRefreshToken(user, jwtId);
    const authInfos: AuthInfos = {
      userInfos: this.userService.getUserInfos(user),
      authToken: authToken,
      refreshToken: refreshToken,
    };
    return authInfos;
  }

  generateAuthToken(user: User, jwtId: string): string {
    const payload: JwtInfos = { userId: user._id, userMail: user.mail };
    return this.jwtService.sign(payload, {
      jwtid: jwtId,
      expiresIn: '5s',
    });
  }

  async generateRefreshToken(user: User, jwtUid: string): Promise<string> {
    const payload = { userId: user._id };
    const refreshTokenEncrypted = this.jwtService.sign(payload, {
      jwtid: jwtUid,
      expiresIn: '1d',
    });
    return this.userService
      .updateRefreshToken(user._id, refreshTokenEncrypted)
      .then(() => Promise.resolve(refreshTokenEncrypted))
      .catch((error) => {
        this.logger.error('Cannot update refresh token');
        throw new InternalServerErrorException();
      });
  }

  invalidateTokens(request: any) {
    const refreshToken = this.jwtService.decode(
      request.cookies['X-REFRESH-TOKEN']
    );
    if (refreshToken) {
      this.userService.findUserById(refreshToken['userId']).then((user) => {
        if (user) {
          this.userService.updateRefreshToken(refreshToken['userId'], null);
        }
      });
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
