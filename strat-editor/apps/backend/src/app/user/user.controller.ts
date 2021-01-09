import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { User, UserDto } from '@strat-editor/data';
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
  async login(@Body() userDto: UserDto, @Res() response): Promise<any> {
    this.authService.login(userDto).then((authInfos) => {
      response.cookie('SESSIONID', authInfos, { httpOnly: true, secure: true });
      response.status(HttpStatus.OK).send();
    });
  }
}
