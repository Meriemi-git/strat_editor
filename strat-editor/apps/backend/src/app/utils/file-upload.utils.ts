import { BadRequestException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

export const imageMimeTypes: string[] = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/bmp',
  'image/gif',
];

export const imageExtensions: string[] = ['jpg', 'jpeg', 'png', 'bmp','gif'];

export const imageFileFilter = (req, file, callback) => {
  const extension: string = file.originalname.substring(
    file.originalname.lastIndexOf('.') + 1
  );
  if (!imageExtensions.some((ext) => ext === extension.toLocaleLowerCase())) {
    return callback(new BadRequestException('Wrong file extension'), false);
  }
  if (
    !imageMimeTypes.some((type) => type === file.mimetype.toLocaleLowerCase())
  ) {
    return callback(new BadRequestException('Wrong upload mimtype'), false);
  }
  callback(null, true);
};
