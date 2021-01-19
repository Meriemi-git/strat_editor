import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserService } from './user.service';
import { Response, Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { PasswordChangeWrapper } from '@strat-editor/data';
import { RateLimit } from 'nestjs-rate-limiter';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    private readonly userService: UserService,
    private authService: AuthService
  ) {}

  @UseGuards(AuthGuard('RegisteredStrategy'))
  @Get('user-infos/:userId')
  public async details(
    @Param() params,
    @Req() request: Request,
    @Res() response: Response
  ): Promise<any> {
    this.logger.debug('/user-infos');
    const actualUserId: string = this.authService.getUserIdFromCookies(request);
    if (actualUserId != params.userId) {
      this.logger.debug('User demanding does not match user from cookie');
      Promise.resolve(response.status(HttpStatus.FORBIDDEN).send());
    } else {
      return this.userService.findUserById(params.userId).then((user) => {
        if (user) {
          const userInfos = this.userService.getUserInfos(user);
          response.status(HttpStatus.OK).send(userInfos);
          return Promise.resolve();
        } else {
          response.status(HttpStatus.FORBIDDEN).send();
        }
      });
    }
  }

  @RateLimit({
    keyPrefix: 'change-password',
    points: 1,
    duration: 300,
    errorMessage: 'Password cannot be changed more than once in per 5 minutes',
  })
  @UseGuards(AuthGuard('RegisteredStrategy'))
  @Post('change-password')
  public async changePassword(
    @Body() passwords: PasswordChangeWrapper,
    @Req() request: Request
  ): Promise<any> {
    const xRefreshToken = request.cookies['X-REFRESH-TOKEN'];
    const xAuthToken = request.cookies['X-AUTH-TOKEN'];
    return this.userService
      .changePassword(xAuthToken, xRefreshToken, passwords)
      .catch((error) => {
        throw error;
      });
  }

  @RateLimit({
    keyPrefix: 'change-mail',
    points: 1,
    duration: 300,
    errorMessage: 'Mail cannot be changed more than once in per 5 minutes',
  })
  @UseGuards(AuthGuard('RegisteredStrategy'))
  @Post('change-mail')
  public async changeMail(@Body() data, @Req() request: Request): Promise<any> {
    const xRefreshToken = request.cookies['X-REFRESH-TOKEN'];
    const xAuthToken = request.cookies['X-AUTH-TOKEN'];
    return this.userService
      .changeMail(xAuthToken, xRefreshToken, data.newMail)
      .catch((error) => {
        throw error;
      });
  }
}
