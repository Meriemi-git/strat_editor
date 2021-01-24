import * as mongoose from 'mongoose';

export type LayerDocument = Layer & mongoose.Document;

export interface Layer {
  floorId: string;
  fabricCanvas: string;
}
export const LayerSchema = new mongoose.Schema({
  floorId: String,
  fabricCanvas: String,
});
