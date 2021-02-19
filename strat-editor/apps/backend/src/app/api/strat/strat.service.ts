import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { PageOptions, Strat, StratDocument } from '@strat-editor/data';
import { Request } from 'express';
import { PaginateModel, PaginateOptions, PaginateResult } from 'mongoose';

@Injectable()
export class StratService {
  private readonly logger = new Logger(StratService.name);

  constructor(
    @InjectModel('Strat') private stratModel: PaginateModel<StratDocument>,
    private readonly jwtService: JwtService
  ) {}

  async addStrat(strat: Strat): Promise<Strat> {
    const createdStrat = new this.stratModel(strat);
    return createdStrat.save();
  }

  async findAllMyStratsPaginated(
    userId: string,
    limit: number,
    page: number,
    sortedBy: string,
    order: 'asc' | 'desc'
  ): Promise<PaginateResult<Strat>> {
    const options: PaginateOptions = {
      limit: limit,
      page: page,
      sort: { [sortedBy]: order },
    };
    return this.stratModel.paginate({ userId: userId }, options);
  }

  async findAllPublicPaginated(
    pageOptions: PageOptions
  ): Promise<PaginateResult<Strat>> {
    const options: PaginateOptions = {
      limit: pageOptions.limit,
      page: pageOptions.page,
      sort: { [pageOptions.sortedBy]: pageOptions.order },
    };
    return this.stratModel.paginate({ isPublic: true }, options);
  }

  findStratById(userId: string, stratId: string): Promise<Strat> {
    return this.stratModel.findOne({ userId: userId, _id: stratId }).exec();
  }

  public getUserIdFromCookies(request: Request) {
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
    return this.stratModel
      .updateOne({ _id: strat._id }, strat)
      .exec()
      .then(() => strat);
  }

  public deleteStrat(stratId: string): any {
    return this.stratModel.findByIdAndDelete(stratId).exec();
  }
}
