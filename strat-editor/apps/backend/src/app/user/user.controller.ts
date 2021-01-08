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
  public async register(@Body() user: User): Promise<User> {
    return this.userService.addUser(user);
  }

  @Post('confirm')
  public async confirm(@Body() body: any): Promise<User> {
    return this.userService.confirmEmailAddress(body.token);
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
