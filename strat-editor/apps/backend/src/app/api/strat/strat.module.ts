import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StratController } from './strat.controller';
import { StratService } from './strat.service';
import { StratSchema } from '@strat-editor/data';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Strat', schema: StratSchema }]),
  ],
  controllers: [StratController],
  providers: [StratService],
})
export class StratModule {}
