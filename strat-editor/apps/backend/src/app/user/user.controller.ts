import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@strat-editor/data';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  public async register(@Body() user: User): Promise<User> {
    return this.userService.addUser(user).catch(() => {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  public async details() {
    return 'User is authentified';
  }
}
