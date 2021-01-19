import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '@strat-editor/data';
import { AuthService } from '../auth/auth.service';
import { jwtConstants } from '../strategies/constants';
import { ConfirmedStrategy } from '../strategies/confirmed.strategy';
import { RegisteredStrategy } from '../strategies/registered.strategy';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RateLimiterModule } from 'nestjs-rate-limiter';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
    RateLimiterModule.register({}),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, ConfirmedStrategy, RegisteredStrategy],
})
export class UserModule {}
