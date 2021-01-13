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
  RefreshToken,
  RefreshTokenDocument,
  User,
  UserDocument,
  UserDto,
} from '@strat-editor/data';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import * as moment from 'moment';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from 'express';
import { environment } from '../../environments/environment.prod';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('RefreshToken')
    private refreshTokenModel: Model<RefreshTokenDocument>,
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

  refresh(request: Request): Promise<AuthInfos> {
    const jwtInfos = this.jwtService.decode(request.cookies['X-AUTH-TOKEN']);
    const refreshToken = this.jwtService.decode(
      request.cookies['X-REFRESH-TOKEN']
    );
    return this.refreshTokenIsValid(jwtInfos, refreshToken).then((isValid) => {
      console.log('refreshTokenIsValid', isValid);
      if (isValid) {
        return this.userService
          .findUserById(refreshToken['userId'])
          .then((user) => {
            const auhtInfos = this.generateTokenAndRefreshToken(user);
            return auhtInfos;
          });
      } else {
        throw new BadRequestException();
      }
    });
  }

  async refreshTokenIsValid(jwtInfos, refreshToken): Promise<boolean> {
    if (jwtInfos['jti'] !== refreshToken['jti']) {
      return false;
    }
    return await this.refreshTokenModel
      .findOne({ _id: refreshToken['_id'] })
      .exec()
      .then((existingRToken) => {
        if (existingRToken && !existingRToken.isValid) {
          console.log('RefreshToken exists and is valid');
          return true;
        } else {
          console.log("RefreshToken doesn't exists or is invalid");
          return false;
        }
      });
  }

  async generateTokenAndRefreshToken(user: User): Promise<AuthInfos> {
    const jwtUid = uuid();
    const payload: JwtInfos = { userId: user._id, userMail: user.mail };

    const accessTokenEncrypted = this.jwtService.sign(payload, {
      jwtid: jwtUid,
      expiresIn: '5s',
    });
    const refreshToken = await this.generateRefreshToken(user);
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

  async generateRefreshToken(user: User): Promise<RefreshToken> {
    const refeshToken: RefreshToken = {
      userId: user._id,
      isValid: false,
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

  invalidateTokens(request: any) {
    const refreshToken = this.jwtService.decode(
      request.cookies['X-REFRESH-TOKEN']
    );
    if (refreshToken) {
      this.refreshTokenModel
        .findOne({ jwiId: refreshToken['jti'] })
        .exec()
        .then((existingToken) => {
          if (existingToken) {
            // Remove all refresh tokens for this user to disconnect him on every devices
            const userId = existingToken.userId;
            this.refreshTokenModel.remove({ userId: userId }).exec();
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
