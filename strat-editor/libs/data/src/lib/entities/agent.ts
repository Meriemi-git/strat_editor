import * as mongoose from 'mongoose';
import { Side } from '../enums/side';
//import { Document } from 'mongoose'
export type AgentDocument = Agent & mongoose.Document;


export interface Agent {
  name : string;
  year : number;
  season : number;
  badge : string;
  portrait : string;
  side: Side;
  description: string;
  role: string;
}

export const AgentSchema =  new mongoose.Schema({
  name : String,
  badge : String,
  year : Number,
  season : Number,
  side : String,
  portrait : String,
  description : String,
  role : String
})

