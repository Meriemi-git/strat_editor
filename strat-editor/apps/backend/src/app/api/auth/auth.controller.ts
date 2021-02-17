import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthInfos, User, UserDto, UserInfos } from '@strat-editor/data';
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
  async login(
    @Body() userDto: UserDto,
    @Res() response: Response
  ): Promise<UserInfos> {
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

  @Get('confirm/:token')
  public async confirm(@Param() param: any): Promise<User> {
    return this.userService.confirmEmailAddress(param.token);
  }

  @Get('disconnect')
  async logout(@Req() request, @Res() response: Response): Promise<any> {
    this.authService.invalidateTokens(request);
    response.clearCookie('X-AUTH-TOKEN');
    response.clearCookie('X-REFRESH-TOKEN');
    return response.status(HttpStatus.OK).send();
  }

  // TODO For prod set cookies Secure True
  private setAuthCookies(authInfos: AuthInfos, response: Response) {
    response.cookie('X-AUTH-TOKEN', authInfos.authToken, {
      httpOnly: true,
      secure: false,
    });
    response.cookie('X-REFRESH-TOKEN', authInfos.refreshToken, {
      httpOnly: true,
      secure: false,
    });
  }
}
