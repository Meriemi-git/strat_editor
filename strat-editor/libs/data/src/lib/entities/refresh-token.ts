import * as mongoose from 'mongoose';

export type RefreshTokenDocument = RefreshToken & mongoose.Document;

export interface RefreshToken {
  jwtid: string;
  userId: string;
  invalidated: boolean;
  creationDate: Date;
  expirationDate: Date;
}

export const RefreshTokenSchema = new mongoose.Schema({
  jwtid: String,
  userId: String,
  invalidated: Boolean,
  creationDate: Date,
  expirationDate: Date,
});
