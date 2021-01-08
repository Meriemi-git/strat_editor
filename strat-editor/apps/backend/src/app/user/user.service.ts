import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtInfos, User, UserDocument } from '@strat-editor/data';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async findByMail(mail: string): Promise<User> {
    return this.userModel.findOne({ mail: mail }).exec();
  }

  async addUser(user: User): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.findByMail(user.mail).then((existing) => {
        if (existing) {
          reject(new ConflictException('User already exists'));
        } else {
          const createdUser = new this.userModel(user);
          createdUser.save();
          resolve(user);
        }
      });
    });
  }

  async verifyToken(payload: JwtInfos): Promise<User> {
    return this.userModel
      .findOne({ mail: payload.userMail, _id: payload.userId })
      .exec();
  }
}
