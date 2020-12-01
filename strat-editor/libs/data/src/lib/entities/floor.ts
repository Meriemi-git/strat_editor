import * as mongoose from 'mongoose';


export type FloorDocument = Floor & mongoose.Document;


export interface Floor {
  name : string;
  image : string;
  level : number
}

export const FloorSchema =  new mongoose.Schema({
  name : String,
  image : String,
  level : Number
})
