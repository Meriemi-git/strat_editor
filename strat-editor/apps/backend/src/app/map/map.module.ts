import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MapController } from './map.controller';
import { MapService } from './map.service';
import { MapSchema } from '@strat-editor/data';

@Module({
  imports: [MongooseModule.forFeature([{ name: "map", schema: MapSchema }])],
  controllers: [MapController],
  providers: [MapService],
})
export class MapModule {}
