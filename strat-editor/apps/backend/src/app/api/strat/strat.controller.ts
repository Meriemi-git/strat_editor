import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Strat } from '@strat-editor/data';
import { StratService } from './strat.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('strat')
export class StratController {
  constructor(private readonly stratService: StratService) {}

  @Get('all')
  @UseGuards(AuthGuard('ConfirmedStrategy'))
  async findAll(@Req() request: Request): Promise<Strat[]> {
    const userIdFromCookies = this.stratService.getUserIdFromCookies(request);
    return this.stratService.findAllStrats(userIdFromCookies);
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
  async deleteStrat(@Param() stratId: string): Promise<any> {
    return this.stratService.deleteStrat(stratId);
  }
}
