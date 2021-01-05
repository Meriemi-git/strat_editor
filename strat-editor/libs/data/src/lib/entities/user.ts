import * as mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;

export interface User {
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
