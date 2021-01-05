import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@strat-editor/data';

import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async findOne(mail: string): Promise<User> {
    return this.userModel.findOne((user) => user.mail === mail).exec();
  }
}
