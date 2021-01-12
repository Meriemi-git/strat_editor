import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { UserDto } from '@strat-editor/data';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() userDto: UserDto, @Res() response): Promise<any> {
    this.authService.login(userDto).then((authInfos) => {
      response.cookie('X-AUTH-TOKEN', authInfos.authToken, {
        httpOnly: true,
        secure: true,
      });
      response.cookie('X-REFRESH-TOKEN', authInfos.refreshToken, {
        httpOnly: true,
        secure: true,
      });
      response.status(HttpStatus.OK).send(authInfos.userInfos);
    });
  }

  @Get('refresh')
  async refreshToken(@Req() request, @Res() response): Promise<any> {
    this.authService.refresh(request).then((authInfos) => {
      response.cookie('X-AUTH-TOKEN', authInfos.accessToken, {
        httpOnly: true,
        secure: true,
      });
      response.cookie('X-REFRESH-TOKEN', authInfos.refreshToken, {
        httpOnly: true,
        secure: true,
      });
      response.status(HttpStatus.OK).send(authInfos.userInfos);
    });
  }

  @Get('logout')
  async logout(@Req() request, @Res() response): Promise<any> {
    this.authService.invalidateTokens(request);
    response.clearCookie('X-AUTH-TOKEN');
    response.clearCookie('X-REFRESH-TOKEN');
    return response.status(HttpStatus.OK).send();
  }
}
