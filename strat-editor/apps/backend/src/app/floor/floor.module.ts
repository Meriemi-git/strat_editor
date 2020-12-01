import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FloorController } from './floor.controller';
import { FloorService } from './floor.service';
import { FloorSchema } from '@strat-editor/data';

@Module({
  imports: [MongooseModule.forFeature([{ name: "Floor", schema: FloorSchema }])],
  controllers: [FloorController],
  providers: [FloorService],
})
export class FloorModule {}
