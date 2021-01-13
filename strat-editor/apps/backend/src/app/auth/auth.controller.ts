import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { User, UserDto, UserInfos } from '@strat-editor/data';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Post('login')
  async login(@Body() userDto: UserDto, @Res() response): Promise<UserInfos> {
    return this.authService.login(userDto).then((authInfos) => {
      response.cookie('X-AUTH-TOKEN', authInfos.authToken, {
        httpOnly: true,
        secure: true,
      });
      response.cookie('X-REFRESH-TOKEN', authInfos.refreshToken, {
        httpOnly: true,
        secure: true,
      });
      response.status(HttpStatus.OK).send(authInfos.userInfos);
      return Promise.resolve(authInfos.userInfos);
    });
  }

  @Get('refresh')
  async refreshToken(@Req() request, @Res() response): Promise<any> {
    return this.authService
      .refresh(request)
      .then((authInfos) => {
        response.cookie('X-AUTH-TOKEN', authInfos.authToken, {
          httpOnly: true,
          secure: true,
        });
        response.cookie('X-REFRESH-TOKEN', authInfos.refreshToken, {
          httpOnly: true,
          secure: true,
        });
        Promise.resolve(
          response.status(HttpStatus.OK).send(authInfos.userInfos)
        );
      })
      .catch((error) => {
        console.log('error', error);
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
        console.log('setting Cookies from authInfos :', authInfos);
        response.cookie('X-AUTH-TOKEN', authInfos.authToken, {
          httpOnly: true,
          secure: true,
        });
        response.cookie('X-REFRESH-TOKEN', authInfos.refreshToken, {
          httpOnly: true,
          secure: true,
        });
        response.status(HttpStatus.OK).send(authInfos.userInfos);
        return Promise.resolve(authInfos.userInfos);
      });
    });
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
}
