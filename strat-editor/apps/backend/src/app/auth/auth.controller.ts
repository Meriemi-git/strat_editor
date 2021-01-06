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
import { User, UserDto } from '@strat-editor/data';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() userDto: UserDto): Promise<User> {
    return this.authService.login(userDto).catch(() => {
      throw new HttpException('Wrong Credentials', HttpStatus.UNAUTHORIZED);
    });
  }
}
