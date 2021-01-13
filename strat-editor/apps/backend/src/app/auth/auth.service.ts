import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import {
  AuthInfos,
  JwtInfos,
  User,
  UserDocument,
  UserDto,
  UserInfos,
} from '@strat-editor/data';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { Request } from 'express';
import { environment } from '../../environments/environment.prod';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private readonly mailerService: MailerService,
    private userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  public async login(userDto: UserDto): Promise<AuthInfos> {
    return this.validateUser(userDto).then((user) => {
      if (!user) {
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
                  reject(new UnauthorizedException('Wrong credentials'));
                }
              });
          } else {
            reject(new UnauthorizedException('Wrong credentials'));
          }
        });
    });
  }

  async refresh(request: Request): Promise<AuthInfos> {
    const xAuthToken = request.cookies['X-AUTH-TOKEN'];
    const xRefreshToken = request.cookies['X-REFRESH-TOKEN'];
    if (!this.tokensWasPaired(xAuthToken, xRefreshToken)) {
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
      userInfos: {
        username: user.username,
        userMail: user.mail,
        mailConfirmed: user.confirmed,
      } as UserInfos,
    } as AuthInfos;
  }

  async generateTokenAndRefreshToken(user: User): Promise<AuthInfos> {
    const jwtId = uuid().toString();
    const authToken = this.generateAuthToken(user, jwtId);
    const refreshToken = await this.generateRefreshToken(user, jwtId);
    const authInfos: AuthInfos = {
      userInfos: {
        mailConfirmed: user.confirmed,
        userMail: user.mail,
        username: user.username,
      },
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
        throw new InternalServerErrorException('Cannot update refresh token');
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

  public sendConfirmationMail(user: UserDocument): Promise<any> {
    const signOptions: JwtSignOptions = {
      expiresIn: '30m',
    };
    const payload = { mail: user.mail, uid: user.uid };
    const token = this.jwtService.sign(payload, signOptions);
    const link = environment.confirmationLink + token;
    return this.mailerService
      .sendMail({
        to: user.mail, // list of receivers
        from: 'contact@aboucipu.fr', // sender address
        subject: 'Confirm your email', // Subject line
        text: `Welcome to strat editor ${user.username} ! \n Please click on the following link to confirm your email address and start using Strat Editor.\n This link will expire in 30 minutes.\n ${link}`,
        html: `<b>Welcome to strat editor ${user.username} !</b><br/>Please click on the following link to confirm your email address and start using Strat Editor.<br/>This link will expire in 30 minutes.<br/> <a href="${link}">${link}</a>`, // HTML body content
      })
      .then(() => {
        Promise.resolve(user);
      })
      .catch((error) => {
        Promise.reject(
          new InternalServerErrorException(
            'Error when sending confirmation mail'
          )
        );
        console.log(error);
      });
  }
}
