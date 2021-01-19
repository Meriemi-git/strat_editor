import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { AuthInfos, User, UserDto, UserInfos } from '@strat-editor/data';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { UserService } from '../user/user.service';
import { RateLimit } from 'nestjs-rate-limiter';
import { RateLimiterInterceptor } from 'nestjs-rate-limiter';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Post('login')
  async login(@Body() userDto: UserDto, @Res() response): Promise<UserInfos> {
    return this.authService
      .login(userDto)
      .then((authInfos) => {
        this.setAuthCookies(authInfos, response);
        response.status(HttpStatus.OK).send(authInfos.userInfos);
        return Promise.resolve(authInfos.userInfos);
      })
      .catch((error) => {
        throw error;
      });
  }

  @Get('refresh')
  async refreshToken(@Req() request, @Res() response): Promise<any> {
    return this.authService
      .refresh(request)
      .then((authInfos) => {
        this.setAuthCookies(authInfos, response);
        Promise.resolve(
          response.status(HttpStatus.OK).send(authInfos.userInfos)
        );
      })
      .catch((error) => {
        response.clearCookie('X-AUTH-TOKEN');
        response.clearCookie('X-REFRESH-TOKEN');
        Promise.resolve(response.status(HttpStatus.FORBIDDEN).send());
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

  @Post('confirm')
  public async confirm(@Body() body: any): Promise<User> {
    return this.userService.confirmEmailAddress(body.token);
  }

  @Get('disconnect')
  async logout(@Req() request, @Res() response: Response): Promise<any> {
    this.authService.invalidateTokens(request);
    response.clearCookie('X-AUTH-TOKEN');
    response.clearCookie('X-REFRESH-TOKEN');
    return response.status(HttpStatus.OK).send();
  }

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
