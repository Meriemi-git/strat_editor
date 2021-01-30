import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Strat, StratDocument } from '@strat-editor/data';
import { Request } from 'express';
import { Model } from 'mongoose';

@Injectable()
export class StratService {
  private readonly logger = new Logger(StratService.name);

  constructor(
    @InjectModel('Strat') private stratModel: Model<StratDocument>,
    private readonly jwtService: JwtService
  ) {}

  async addStrat(strat: Strat): Promise<Strat> {
    const createdStrat = new this.stratModel(strat);
    return createdStrat.save();
  }

  async findAllStratForUser(userId: string): Promise<Strat[]> {
    return this.stratModel.find({ createdBy: userId }).exec();
  }

  public getUserIdFromRequest(request: Request) {
    const xAuthToken = request.cookies['X-AUTH-TOKEN'];
    try {
      const jwtInfos = this.jwtService.decode(xAuthToken);
      return jwtInfos['userId'];
    } catch (error) {
      this.logger.debug('Error in getUserIdFromCookies');
      return null;
    }
  }

  public updateStrat(strat: Strat): Promise<Strat> {
    return this.stratModel.updateOne(strat).exec();
  }

  public deleteStrat(stratId: string): any {
    return this.stratModel.findByIdAndDelete(stratId).exec();
  }
}
