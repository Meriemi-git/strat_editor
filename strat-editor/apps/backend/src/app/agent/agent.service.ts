import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Agent, AgentDocument, AgentDto } from '@strat-editor/data';

import { Model } from 'mongoose';

@Injectable()
export class AgentService {
  constructor(@InjectModel(Agent.name) private agentModel: Model<AgentDocument>) {}

  async addAgent(createCatDto: AgentDto): Promise<Agent> {
    const createdAgent = new this.agentModel(createCatDto);
    return createdAgent.save();
  }

  async findAll(): Promise<Agent[]> {
    return this.agentModel.find().exec();
  }
}
