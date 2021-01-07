import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthInfos, User, UserDto } from '@strat-editor/data';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

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

  @Post('login')
  async login(@Body() userDto: UserDto): Promise<AuthInfos> {
    return this.authService.login(userDto).catch(() => {
      throw new HttpException('Wrong Credentials', HttpStatus.UNAUTHORIZED);
    });
  }
}
