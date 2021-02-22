import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PageOptions, Strat, StratFilter } from '@strat-editor/data';
import { StratService } from './strat.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { PaginateResult } from 'mongoose';

@Controller('strats')
export class StratController {
  constructor(private readonly stratService: StratService) {}

  @Post('all')
  @UseGuards(AuthGuard('ConfirmedStrategy'))
  async getMyStratPaginated(
    @Query('limit') limit: number,
    @Query('page') page: number,
    @Body() stratFilter: StratFilter
  ): Promise<PaginateResult<Strat>> {
    console.log('getMyStratPaginated limit', limit);
    console.log('getMyStratPaginated page', page);
    console.log('getMyStratPaginated stratFilter', stratFilter);
    return this.stratService.findAllMyStratsPaginated(limit, page, stratFilter);
  }

  @Post('public')
  @UseGuards(AuthGuard('ConfirmedStrategy'))
  async findAllPublicStratPaginate(
    @Body() pageOption: PageOptions
  ): Promise<PaginateResult<Strat>> {
    return this.stratService.findAllPublicPaginated(pageOption);
  }

  @Get(':stratId')
  @UseGuards(AuthGuard('ConfirmedStrategy'))
  async getById(
    @Param('stratId') stratId: string,
    @Req() request: Request
  ): Promise<Strat> {
    const userIdFromCookies = this.stratService.getUserIdFromCookies(request);
    return this.stratService.findStratById(userIdFromCookies, stratId);
  }

  @Post()
  @UseGuards(AuthGuard('ConfirmedStrategy'))
  async addstrat(@Body() strat: Strat): Promise<Strat> {
    return this.stratService.addStrat(strat);
  }

  @Patch()
  @UseGuards(AuthGuard('ConfirmedStrategy'))
  async updateStrat(@Body() strat: Strat): Promise<Strat> {
    return this.stratService.updateStrat(strat);
  }

  @UseGuards(AuthGuard('ConfirmedStrategy'))
  @Delete(':stratId')
  async deleteStrat(@Param('stratId') stratId: string): Promise<any> {
    return this.stratService.deleteStrat(stratId);
  }
}
