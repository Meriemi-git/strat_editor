import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type UserDocument = User & mongoose.Document;

export interface User extends mongoose.Document {
  _id: string;
  firstName: string;
  lastName: string;
  password: string;
  mail: string;
}

export const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  password: String,
  mail: String,
});

UserSchema.pre<User>('save', function () {
  return new Promise<void>((resolve, reject) => {
    let user = this;
    console.log('In pre-save', user);
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
        console.log('hash', hash);
        user.password = hash;

        resolve();
      });
    });
  });
});
