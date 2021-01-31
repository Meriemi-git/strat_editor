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
} from '@nestjs/common';
import { Strat } from '@strat-editor/data';
import { StratService } from './strat.service';
import { Request } from 'express';

@Controller('strat')
export class StratController {
  constructor(private readonly stratService: StratService) {}

  @Get('all/:userId')
  async findAll(
    @Param('userId') userId: string,
    @Req() request: Request
  ): Promise<Strat[]> {
    const userIdFromRequest = this.stratService.getUserIdFromRequest(request);
    if (userIdFromRequest === userId) {
      return this.stratService.findAllStratForUser(userId);
    } else {
      throw new BadRequestException();
    }
  }

  @Post()
  async addstrat(@Body() strat: Strat): Promise<Strat> {
    return this.stratService.addStrat(strat);
  }

  @Patch()
  async updateStrat(@Body() strat: Strat): Promise<Strat> {
    return this.stratService.updateStrat(strat);
  }

  @Delete(':stratId')
  async deleteStrat(@Param() stratId: string): Promise<any> {
    return this.stratService.deleteStrat(stratId);
  }
}
