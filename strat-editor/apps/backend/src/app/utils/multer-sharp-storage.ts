import { StorageEngine } from 'multer';
import * as fs from 'fs';
import { v4 as uuid } from 'uuid';
import * as sharp from 'sharp';
import { Logger } from '@nestjs/common';
import { Stream } from 'stream';

export class MulterSharpStorage implements StorageEngine {
  private readonly logger = new Logger(MulterSharpStorage.name);

  public imagesPath: string;
  public thumbnailsPath: string;
  public format: 'png' | 'jpeg' | 'webp';
  constructor(
    imagesPath: string,
    thumbnailsPath: string,
    format: 'png' | 'jpeg' | 'webp'
  ) {
    this.imagesPath = imagesPath;
    this.thumbnailsPath = thumbnailsPath;
    this.format = format;
  }
  _handleFile(req, file: Express.Multer.File, cb) {
    const filename = `${uuid()}.${this.format}`;
    const imageFullPath = `${this.imagesPath}/${filename}`;
    const thumbnailFullPath = `${this.thumbnailsPath}/thumb-${filename}`;

    fs.access(this.imagesPath, fs.constants.W_OK, (err) => {
      if (err) {
        fs.mkdirSync(this.imagesPath, fs.constants.W_OK);
      }
      fs.access(this.thumbnailsPath, fs.constants.W_OK, (err) => {
        if (err) {
          fs.mkdirSync(this.thumbnailsPath, fs.constants.W_OK);
        }
        // Convert image
        const imageStream = sharp();
        file.stream.pipe(imageStream);
        const imagePromise = imageStream
          .toFormat(this.format, { lossless: true })
          .toFile(imageFullPath);

        // Generate thumbnail
        const thumbnailStream = sharp();
        file.stream.pipe(thumbnailStream);
        const thumbnailPromise = thumbnailStream
          .toFormat(this.format, { lossless: true })
          .resize(100)
          .toFile(thumbnailFullPath);

        // Run all promises
        Promise.all([imagePromise, thumbnailPromise])
          .then((output) => {
            cb(null, {
              filename: filename,
              originalname: file.originalname,
              path: imageFullPath,
              size: output[0].size,
            });
          })
          .catch((error) => {
            this.logger.error('Error during processing images Stream');
            cb(error, null);
          });
      });
    });
  }

  _removeFile(req, file, cb) {
    fs.unlink(file.path, cb);
  }
}
