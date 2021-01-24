import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Strat } from '@strat-editor/data';
import { AuthService } from '../auth/auth.service';
import { StratService } from './strat.service';
import { Request } from 'express';
@Controller('agent')
export class StratController {
  constructor(
    private readonly stratService: StratService,
    private authService: AuthService
  ) {}

  @Get('all')
  async findAll(@Req() request: Request): Promise<Strat[]> {
    return this.stratService.findAllStratForUser(
      this.authService.getUserIdFromRequest(request)
    );
  }

  @Post()
  async addstrat(@Body() strat: Strat): Promise<Strat> {
    return this.stratService.addStrat(strat);
  }
}
