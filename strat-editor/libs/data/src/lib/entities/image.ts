import * as mongoose from 'mongoose';

export type ImageDocument = Image & mongoose.Document;

export interface Image {
  _id: string;
  imageName: string;
  size: number;
  fileName: string;
  userId: string;
  description: string;
  uploadedAt: Date;
}

export const ImageSchema = new mongoose.Schema({
  imageName: String,
  size: Number,
  fileName: {
    type: String,
    unique: true,
  },
  userId: String,
  description: String,
  uploadedAt: Date,
});
