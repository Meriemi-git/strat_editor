import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { UserRole } from '../helpers/user-role';

export type UserDocument = User & mongoose.Document;

export class User extends mongoose.Document {
  _id: string;
  username: string;
  password: string;
  mail: string;
  confirmed: boolean;
  uid: string;
  role: UserRole;
  cguAgreement: boolean;
  cguAgreementDate: Date;
}

export interface UserDto {
  password: string;
  mail: string;
  username?: string;
}

export const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  mail: String,
  confirmed: Boolean,
  uid: String,
  cguAgreement: {
    type: Boolean,
    required: true,
  },
  cguAgreementDate: {
    type: Date,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.REGULAR,
    required: true,
  },
});

UserSchema.pre<User>('save', function () {
  return new Promise<void>((resolve, reject) => {
    let user: UserDocument = this;
    if (!this.isModified('password')) {
      resolve();
    }
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return reject(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return reject(err);
        }
        user.password = hash;
        user.mail = user.mail.toLocaleLowerCase();
        user.confirmed = false;
        resolve();
      });
    });
  });
});
