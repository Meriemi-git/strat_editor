import { Controller, Get, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('details')
  public async details(@Res() response: Response) {
    return response.status(HttpStatus.OK).send();
  }
}
