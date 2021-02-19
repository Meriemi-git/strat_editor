import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Map, MapDocument } from '@strat-editor/data';
import { Model } from 'mongoose';

@Injectable()
export class MapService {
  constructor(@InjectModel('Map') private mapModel: Model<MapDocument>) {}

  async addMap(map: Map): Promise<Map> {
    const createdMap = new this.mapModel(map);
    return createdMap.save();
  }

  async findAll(): Promise<Map[]> {
    return this.mapModel.find().exec();
  }
}
