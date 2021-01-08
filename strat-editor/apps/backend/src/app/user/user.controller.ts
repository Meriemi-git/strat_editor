import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Res,
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
  public async register(@Body() user: User, @Res() res): Promise<User> {
    return this.userService.addUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  public async details() {
    return 'User is authentified';
  }

  @Post('login')
  async login(@Body() userDto: UserDto): Promise<AuthInfos> {
    return this.authService.login(userDto);
  }
}
