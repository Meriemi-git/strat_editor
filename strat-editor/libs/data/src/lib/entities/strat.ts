import { Layer, LayerSchema } from './layer';
import { Map, MapSchema } from './map';
import * as mongoose from 'mongoose';

export type StratDocument = Strat & mongoose.Document;

export interface Strat {
  _id?: string;
  name: string;
  description: string;
  createdAt: Date;
  lastModifiedAt: Date;
  createdBy: string;
  votes: number;
  layers: Layer[];
  mapId: string;
  isPublic: boolean;
}
export const StratSchema = new mongoose.Schema({
  name: String,
  description: String,
  createdAt: Date,
  lastModifiedAt: Date,
  createdBy: String,
  votes: Number,
  mapId: String,
  layers: [
    {
      type: LayerSchema,
      ref: 'Layer',
    },
  ],
  isPublic: Boolean,
});
