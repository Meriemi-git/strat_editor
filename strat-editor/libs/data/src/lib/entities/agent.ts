import * as mongoose from 'mongoose';
//import { Document } from 'mongoose'
export type AgentDocument = Agent & mongoose.Document;


export interface Agent {
  name : string,
  imgUrl : string,
}

export const AgentSchema =  new mongoose.Schema({
  name : String,
  imgUrl : String,
})

