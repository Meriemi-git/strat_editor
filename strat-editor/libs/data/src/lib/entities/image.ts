import * as mongoose from 'mongoose';

export type ImageDocument = Image & mongoose.Document;

export interface Image {
  _id: string;
  name: string;
  size: number;
  guid: string;
  userId: string;
}

export const ImageSchema = new mongoose.Schema({
  name: {
    type: {
      type: String,
    },
  },
  size: {
    type: {
      type: String,
    },
  },
  guid: {
    type: String,
    unique: true,
  },
  userId: {
    type: {
      type: String,
    },
  },
});
