import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { User } from '@strat-editor/data';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signin')
  public async signin(@Body() user: User): Promise<User> {
    return this.userService.addUser(user).catch((error) => {
      throw new HttpException('User already exists', HttpStatus.FORBIDDEN);
    });
  }
}
