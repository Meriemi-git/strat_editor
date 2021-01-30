import * as mongoose from 'mongoose';

export type LayerDocument = Layer & mongoose.Document;

export interface Layer {
  floorId: string;
  floorName: string;
  fabricCanvas: string;
}
export const LayerSchema = new mongoose.Schema({
  floorId: String,
  floorName: String,
  fabricCanvas: String,
});
