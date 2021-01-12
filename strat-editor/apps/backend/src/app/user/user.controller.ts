import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '@strat-editor/data';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  public async register(@Body() user: User): Promise<User> {
    return this.userService.addUser(user);
  }

  @Post('confirm')
  public async confirm(@Body() body: any): Promise<User> {
    return this.userService.confirmEmailAddress(body.token);
  }

  @UseGuards(JwtAuthGuard)
  @Get('details')
  public async details() {
    return 'User is authentified';
  }
}
