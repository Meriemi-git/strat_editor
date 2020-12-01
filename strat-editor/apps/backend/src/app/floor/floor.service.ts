import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Floor, FloorDocument } from '@strat-editor/data';

import { Model } from 'mongoose';

@Injectable()
export class FloorService {
  constructor(@InjectModel("Floor") private floorModel: Model<FloorDocument>) {}

  async addFloor(floor: Floor): Promise<Floor> {
    const createdFloor = new this.floorModel(floor);
    return createdFloor.save();
  }

  async findAll(): Promise<Floor[]> {
    return this.floorModel.find().exec();
  }
}
