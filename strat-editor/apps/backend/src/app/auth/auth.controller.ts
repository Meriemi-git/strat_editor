import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from '@strat-editor/data';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() user: User): Promise<User> {
    return this.authService.login(user).catch(() => {
      throw new HttpException('Wrong Credentials', HttpStatus.UNAUTHORIZED);
    });
  }
}
