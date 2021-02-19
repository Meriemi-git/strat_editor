import * as mongoose from 'mongoose';
import { Floor, FloorSchema } from './floor';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type MapDocument = Map & mongoose.Document;

export interface Map {
  _id: string;
  name: string;
  year: number;
  season: number;
  image: string;
  floors: Floor[];
}

export const MapSchema = new mongoose.Schema({
  name: String,
  badge: String,
  year: Number,
  season: Number,
  imageId: String,
  floors: [
    {
      type: FloorSchema,
      ref: 'Floor',
    },
  ],
});

MapSchema.plugin(mongoosePaginate);
