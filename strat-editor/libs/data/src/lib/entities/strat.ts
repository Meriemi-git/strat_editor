import { Layer, LayerSchema } from './layer';
import * as mongoose from 'mongoose';

export type StratDocument = Strat & mongoose.Document;

export interface Strat {
  name: string;
  description: string;
  createdAt: Date;
  lastModifiedAt: Date;
  createdBy: string;
  votes: number;
  mapId: string;
  layers: Layer[];
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
});
