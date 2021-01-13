import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtInfos, User, UserDocument, UserDto } from '@strat-editor/data';
import { Model } from 'mongoose';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
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

  public async addUser(userDto: UserDto): Promise<UserDocument> {
    return new Promise<UserDocument>((resolve, reject) => {
      this.findByMail(userDto.mail).then((existing) => {
        if (existing) {
          reject(new ConflictException('User already exists'));
        } else {
          const createdUser = new this.userModel(userDto);
          createdUser.uid = v4();
          createdUser
            .save()
            .then(() => {
              resolve(createdUser);
            })
            .catch((error) => {
              console.log('Error when saving new user : ', error);
              reject(new InternalServerErrorException());
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
}
