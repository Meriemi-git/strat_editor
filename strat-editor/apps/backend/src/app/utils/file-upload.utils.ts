import { BadRequestException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

export const imageMimeTypes: string[] = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/bmp',
];

export const imageExtensions: string[] = ['jpg', 'jpeg', 'png', 'bmp'];

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

export const imageFileName = (req, file, callback) => {
  const extension: string = file.originalname.substring(
    file.originalname.lastIndexOf('.')
  );
  return callback(null, `${uuid()}${extension.toLocaleLowerCase()}`);
};
