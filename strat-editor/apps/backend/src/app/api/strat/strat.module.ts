import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StratController } from './strat.controller';
import { StratService } from './strat.service';
import { StratSchema } from '@strat-editor/data';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../strategies/constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Strat', schema: StratSchema }]),
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  controllers: [StratController],
  providers: [StratService],
})
export class StratModule {}
