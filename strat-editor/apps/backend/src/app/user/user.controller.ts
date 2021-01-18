import {
  Body,
  Controller,
  Get,
  HttpStatus,
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

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('user-infos/:userId')
  public async details(
    @Param() params,
    @Req() request: Request,
    @Res() response: Response
  ): Promise<any> {
    const actualUserId: string = this.authService.getUserIdFromCookies(request);
    if (actualUserId != params.userId) {
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
  @Post('change-password')
  public async chnagePassword(
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
}
