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
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  public async signin(@Body() user: User): Promise<User> {
    return this.userService.addUser(user).catch((error) => {
      throw new HttpException('User already exists', HttpStatus.FORBIDDEN);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('details/:mail')
  public async details(@Param('mail') mail: string) {
    return 'display user details ' + mail;
  }
}
