import * as mongoose from 'mongoose';


export type FloorDocument = Floor & mongoose.Document;


export interface Floor {
  name : string;
  image : string;
  number : number
}

export const FloorSchema =  new mongoose.Schema({
  name : String,
  image : String,
  number : Number
})
