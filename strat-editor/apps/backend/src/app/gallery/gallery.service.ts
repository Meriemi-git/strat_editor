import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Image, ImageDocument } from '@strat-editor/data';
import { Model } from 'mongoose';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import * as sharp from 'sharp';

@Injectable()
export class GalleryService {
  private readonly logger = new Logger(GalleryService.name);

  constructor(
    @InjectModel('Image') private imageModel: Model<ImageDocument>,
    private readonly jwtService: JwtService
  ) {}

  public getAllImagesForUser(userId: string): Promise<Image[]> {
    return this.imageModel.find({ userId: userId }).sort('uploadedAt').exec();
  }

  public saveImage(file: any, userId: string): Promise<Image> {
    return sharp(file.path)
      .resize(100)
      .toFile('uploads/thumbs/' + 'thumb-' + file.filename.toLocaleLowerCase())
      .then(() => {
        const image = {
          fileName: file.filename,
          imageName: file.originalname,
          size: file.size,
          userId: userId,
          uploadedAt: new Date(),
        };
        const imageDocument = new this.imageModel(image);
        return imageDocument
          .save()
          .then((image) => Promise.resolve(image))
          .catch(() => {
            throw new InternalServerErrorException('Cannot save the image');
          });
      })
      .catch((error) => {
        this.logger.error('Cannot create thumbnails' + error);
        throw new InternalServerErrorException('Cannot create thumbnails');
      });
  }

  public getUserIdFromRequest(request: Request) {
    const xAuthToken = request.cookies['X-AUTH-TOKEN'];
    try {
      const jwtInfos = this.jwtService.decode(xAuthToken);
      return jwtInfos['userId'];
    } catch (error) {
      this.logger.debug('Error in getUserIdFromCookies');
      return null;
    }
  }
}
