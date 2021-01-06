import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@strat-editor/data';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async findOne(mail: string): Promise<User> {
    return this.userModel.findOne({ mail: mail }).exec();
  }

  async addUser(user: User): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.findOne(user.mail).then((existing) => {
        if (existing) {
          reject('User already registered');
        } else {
          const createdUser = new this.userModel(user);
          createdUser.save();
          resolve(user);
        }
      });
    });
  }
}
