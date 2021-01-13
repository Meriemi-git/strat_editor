import * as mongoose from 'mongoose';

export type RefreshTokenDocument = RefreshToken & mongoose.Document;

export interface RefreshToken {
  userId: string;
  isValid: boolean;
  creationDate: Date;
  expirationDate: Date;
}

export const RefreshTokenSchema = new mongoose.Schema({
  userId: String,
  isValid: Boolean,
  creationDate: Date,
  expirationDate: Date,
});
