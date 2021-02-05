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

  @Get('all/:userId')
  @UseGuards(AuthGuard('ConfirmedStrategy'))
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
  @UseGuards(AuthGuard('ConfirmedStrategy'))
  async addstrat(@Body() strat: Strat): Promise<Strat> {
    console.log('post strat', strat);
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
