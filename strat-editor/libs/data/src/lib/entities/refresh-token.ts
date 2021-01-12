import * as mongoose from 'mongoose';

export type RefreshTokenDocument = RefreshToken & mongoose.Document;

export interface RefreshToken {
  jwtid: string;
  useriId: string;
  invalidated: boolean;
  creationDate: Date;
  expirationDate: Date;
}

export const RefreshTokenSchema = new mongoose.Schema({
  image: String,
  level: Number,
  invalidated: Boolean,
  expirationDate: Date,
  creationDate: Date,
});
