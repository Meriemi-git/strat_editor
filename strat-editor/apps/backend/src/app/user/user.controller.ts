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
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response, Request } from 'express';
import { AuthService } from '../auth/auth.service';
import {
  AuthInfos,
  PasswordChangeWrapper,
  UserDto,
  UserInfos,
} from '@strat-editor/data';
import { RateLimit, RateLimiterInterceptor } from 'nestjs-rate-limiter';
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

  @UseInterceptors(RateLimiterInterceptor)
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

  @Post('register')
  public async register(
    @Body() userDto: UserDto,
    @Res() response: Response
  ): Promise<UserInfos> {
    return this.userService.addUser(userDto).then((createdUser) => {
      this.authService.sendConfirmationMail(createdUser);
      return this.authService.login(userDto).then((authInfos) => {
        this.setAuthCookies(authInfos, response);
        response.status(HttpStatus.OK).send(authInfos.userInfos);
        return Promise.resolve(authInfos.userInfos);
      });
    });
  }

  @UseInterceptors(RateLimiterInterceptor)
  @RateLimit({
    keyPrefix: 'send-confirmation-mail',
    points: 1,
    duration: 300,
    errorMessage:
      'Confirmation mail cannot be sent more than once in per 5 minutes',
  })
  @Post('send-confirmation-mail')
  public async sendConfirmationEmail(
    @Body() mailUser: string,
    @Res() response: Response
  ): Promise<any> {
    response.status(HttpStatus.OK).send();
    return Promise.resolve();
  }
  q;

  private setAuthCookies(authInfos: AuthInfos, response: Response) {
    response.cookie('X-AUTH-TOKEN', authInfos.authToken, {
      httpOnly: true,
      secure: true,
    });
    response.cookie('X-REFRESH-TOKEN', authInfos.refreshToken, {
      httpOnly: true,
      secure: true,
    });
  }
}
