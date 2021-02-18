import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  AuthToken,
  PasswordChangeWrapper,
  User,
  UserDocument,
  UserDto,
  UserInfos,
} from '@strat-editor/data';
import { Model } from 'mongoose';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { v4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { environment } from '../../../environments/environment.prod';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService
  ) {}

  public async findByMail(mail: string): Promise<User> {
    return this.userModel.findOne({ mail: mail }).exec();
  }

  public async findUserById(userId: string): Promise<User> {
    return this.userModel.findOne({ _id: userId }).exec();
  }

  public changePassword(
    xAuthToken: string,
    xRefreshToken: string,
    passwords: PasswordChangeWrapper
  ): Promise<any> {
    const authToken = this.jwtService.decode(xAuthToken);
    return this.userModel
      .findOne({ _id: authToken['userId'], refreshToken: xRefreshToken })
      .then((user) => {
        if (user) {
          bcrypt
            .compare(passwords.oldPassword, user.password)
            .then((matching) => {
              if (matching) {
                this.logger.debug('Passwords match');
                user.password = passwords.newPassword;
                return user
                  .save()
                  .then(() => {
                    return Promise.resolve();
                  })
                  .catch(() => {
                    this.logger.error("'Error during update password");
                    throw new InternalServerErrorException();
                  });
              } else {
                this.logger.debug("Passwords doesn't match");
                throw new UnauthorizedException();
              }
            });
        } else {
          this.logger.debug('User not founded');
          throw new ForbiddenException();
        }
      });
  }

  public changeMail(xAuthToken: any, xRefreshToken: any, newMail: string) {
    const authToken = this.jwtService.decode(xAuthToken);
    return this.userModel
      .findOne({
        _id: authToken['userId'],
        refreshToken: xRefreshToken,
      })
      .then((user) => {
        if (user) {
          if (user.mail !== newMail) {
            user.mail = newMail;
            user.confirmed = false;
            return user
              .save()
              .then(() => {
                return this.sendConfirmationMail(user)
                  .then(() => {
                    return Promise.resolve(this.getUserInfos(user));
                  })
                  .catch((error) => {
                    this.logger.error('Error during sending confirmation');
                    throw new InternalServerErrorException();
                  });
              })
              .catch(() => {
                this.logger.error('Error during update password');
                throw new InternalServerErrorException();
              });
          } else {
            this.logger.debug('Mail is not different');
            throw new ForbiddenException(
              'You must choose a different email address'
            );
          }
        } else {
          this.logger.debug('User not found');
          throw new ForbiddenException();
        }
      });
  }

  public async updateRefreshToken(
    userId: string,
    refreshTokenEncrypted: string
  ): Promise<any> {
    return this.userModel
      .updateOne({ _id: userId }, { refreshToken: refreshTokenEncrypted })
      .exec();
  }

  public async addUser(userDto: UserDto): Promise<UserDocument> {
    return new Promise<UserDocument>((resolve, reject) => {
      this.findByMail(userDto.mail).then((existing) => {
        if (existing) {
          this.logger.debug('Mail already registered');
          throw new ConflictException('Mail already registered');
        } else {
          const createdUser = new this.userModel(userDto);
          createdUser.uid = v4();
          createdUser.cguAgreement = true;
          createdUser.cguAgreementDate = new Date();
          createdUser
            .save()
            .then(() => {
              this.logger.debug(`Add user with mail ${createdUser.mail}`);
              resolve(createdUser);
            })
            .catch((error) => {
              this.logger.debug(`Error when saving user`);
              throw new InternalServerErrorException();
            });
        }
      });
    });
  }

  public async confirmEmailAddress(token: string): Promise<any> {
    try {
      const payload = this.jwtService.verify(token);
      const mail = payload['mail'];
      const uid = payload['uid'];
      if (payload) {
        return this.userModel
          .findOne({ mail: mail, uid: uid })
          .exec()
          .then((user) => {
            if (user) {
              if (user.confirmed) {
                throw new BadRequestException(
                  'Email address already confirmed'
                );
              } else {
                this.userModel
                  .updateOne({ uid: uid }, { confirmed: true })
                  .exec();
                Promise.resolve();
              }
            } else {
              throw new InternalServerErrorException(
                'Error during email confirmation'
              );
            }
          });
      } else {
        throw new BadRequestException('Error during decoding token');
      }
    } catch (error) {
      this.logger.error('Token expired');
      throw new NotAcceptableException('Confirmation link expired');
    }
  }

  public async getUserFromToken(
    payload: AuthToken,
    refreshToken: string
  ): Promise<User> {
    if (!refreshToken) {
      this.logger.debug('RefreshToken is null');
      throw new UnauthorizedException();
    }
    return this.userModel
      .findOne({ mail: payload.userMail, _id: payload.userId })
      .exec();
  }

  public getUserInfos(user: User): UserInfos {
    return {
      mailConfirmed: user.confirmed,
      stratIds: [],
      userId: user._id,
      userMail: user.mail,
      username: user.username,
      role: user.role,
    } as UserInfos;
  }

  public sendConfirmationMail(user: User): Promise<any> {
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
        this.logger.debug('Confirmation mail successfully sent');
        Promise.resolve();
      })
      .catch((error) => {
        this.logger.error('Error during confirmation mail sending');
        throw new InternalServerErrorException();
      });
  }
}
