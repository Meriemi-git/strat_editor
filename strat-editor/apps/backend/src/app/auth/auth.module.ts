import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshTokenSchema, UserSchema } from '@strat-editor/data';
import { AuthService } from '../auth/auth.service';
import { jwtConstants } from '../strategies/constants';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'RefreshToken', schema: RefreshTokenSchema },
    ]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
