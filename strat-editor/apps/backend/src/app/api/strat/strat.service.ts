import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Strat, StratDocument } from '@strat-editor/data';

import { Model } from 'mongoose';

@Injectable()
export class StratService {
  constructor(@InjectModel('Strat') private stratModel: Model<StratDocument>) {}

  async addStrat(strat: Strat): Promise<Strat> {
    const createdStrat = new this.stratModel(strat);
    return createdStrat.save();
  }

  async findAllStratForUser(userId: string): Promise<Strat[]> {
    return this.stratModel.find({ createdBy: userId }).exec();
  }
}
