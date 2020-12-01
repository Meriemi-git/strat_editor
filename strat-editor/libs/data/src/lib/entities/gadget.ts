import * as mongoose from 'mongoose';


export type GadgetDocument = Gadget & mongoose.Document;


export interface Gadget {
  name : string;
  year : number;
  season : number;
  icon : string;
}

export const GadgetSchema =  new mongoose.Schema({
  name : String,
  year : Number,
  season : Number,
  icon : String,
})

