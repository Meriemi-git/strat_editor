import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  JwtInfos,
  PasswordChangeWrapper,
  User,
  UserDocument,
  UserDto,
  UserInfos,
} from '@strat-editor/data';
import { Model } from 'mongoose';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { v4 } from 'uuid';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
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
    this.logger.debug('Changing password');
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
    const verifyOptions: JwtVerifyOptions = {
      ignoreExpiration: false,
    };
    const payload = this.jwtService.verify(token, verifyOptions);
    const mail = payload['mail'];
    const uid = payload['uid'];
    if (payload) {
      return this.userModel
        .findOne({ mail: mail, uid: uid })
        .exec()
        .then((user) => {
          if (user) {
            if (user.confirmed) {
              return new BadRequestException('Email address already confirmed');
            } else {
              this.userModel
                .updateOne({ uid: uid }, { confirmed: true })
                .exec();
              Promise.resolve();
            }
          } else {
            return new BadRequestException('Error during email confirmation');
          }
        });
    } else {
      return new BadRequestException('Error during decoding token');
    }
  }

  public async verifyToken(payload: JwtInfos): Promise<User> {
    return this.userModel
      .findOne({ mail: payload.userMail, _id: payload.userId })
      .exec();
  }

  public getUserInfos(user: User): any {
    return {
      mailConfirmed: user.confirmed,
      stratIds: [],
      userId: user._id,
      userMail: user.mail,
      username: user.username,
    } as UserInfos;
  }
}
