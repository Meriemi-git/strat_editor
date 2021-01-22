import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Agent, AgentDocument } from '@strat-editor/data';

import { Model } from 'mongoose';

@Injectable()
export class AgentService {
  constructor(@InjectModel('Agent') private agentModel: Model<AgentDocument>) {}

  async addAgent(agent: Agent): Promise<Agent> {
    const createdAgent = new this.agentModel(agent);
    return createdAgent.save();
  }

  async findAll(): Promise<Agent[]> {
    return this.agentModel.find().exec();
  }
}
