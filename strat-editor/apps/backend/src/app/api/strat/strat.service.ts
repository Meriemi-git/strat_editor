import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import {
  PageOptions,
  Strat,
  StratDocument,
  StratFilter,
} from '@strat-editor/data';
import { Request } from 'express';
import { FilterQuery } from 'mongoose';
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
    limit: number,
    page: number,
    stratFilter: StratFilter
  ): Promise<PaginateResult<Strat>> {
    const options: PaginateOptions = {
      limit: limit,
      page: page,
      sort: { [stratFilter.sortedBy]: stratFilter.order },
    };
    let query: FilterQuery<StratDocument> = {};
    query.mapId;
    if (stratFilter.mapIds?.length > 0) {
      query.mapId = { $in: stratFilter.mapIds };
    }
    if (stratFilter.userId) {
      query.userId = stratFilter.userId;
    }
    if (stratFilter.name) {
      query.name = `/.*${stratFilter.name}.*/`;
    }

    return this.stratModel.paginate(query, options);
  }

  async findAllPublicPaginated(
    pageOptions: PageOptions
  ): Promise<PaginateResult<Strat>> {
    const options: PaginateOptions = {
      limit: pageOptions.limit,
      page: pageOptions.page,
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
