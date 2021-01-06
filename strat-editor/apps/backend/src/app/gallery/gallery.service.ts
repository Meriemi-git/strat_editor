import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ImageDocument } from '@strat-editor/data';
import { Model } from 'mongoose';

@Injectable()
export class GalleryService {
  constructor(@InjectModel('Image') private imageModel: Model<ImageDocument>) {}

  getAllImagesForUser(userId: string): Promise<string[]> {
    return new Promise((resolve) => {
      this.imageModel
        .find({ userId: userId }, { guid: 1, _id: 0 })
        .exec()
        .then((imageDocs) =>
          resolve(imageDocs.map((imageDoc) => imageDoc.guid))
        );
    });
  }
}
