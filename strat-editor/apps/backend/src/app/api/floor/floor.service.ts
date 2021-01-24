import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Floor, FloorDocument } from '@strat-editor/data';

import { Model } from 'mongoose';

@Injectable()
export class FloorService {
  constructor(@InjectModel("Floor") private floorModel: Model<FloorDocument>) {}
}
