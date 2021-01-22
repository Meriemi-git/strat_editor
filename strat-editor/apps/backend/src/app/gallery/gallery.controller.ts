import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { GalleryService } from './gallery.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { imageFileFilter, imageFileName } from '../utils/file-upload.utils';
import { Image } from '@strat-editor/data';
import { diskStorage } from 'multer';
import { environment } from '../../environments/environment';

@Controller('gallery')
export class GalleryController {
  private readonly logger = new Logger(GalleryController.name);

  constructor(private readonly galleryService: GalleryService) {}

  @UseGuards(AuthGuard('ConfirmedStrategy'))
  @Get('images')
  public allImages(@Req() request: Request): Promise<Image[]> {
    const userId = this.galleryService.getUserIdFromRequest(request);
    return this.galleryService.getAllImagesForUser(userId);
  }

  @UseGuards(AuthGuard('ConfirmedStrategy'))
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/images',
        filename: imageFileName,
      }),
      limits: { fileSize: 5 * 1024 * 1024, files: 1 },
      fileFilter: imageFileFilter,
    })
  )
  public uploadFile(
    @UploadedFile() file: any,
    @Req() request: Request
  ): Promise<Image> {
    this.logger.log('Uploading file');
    const userId = this.galleryService.getUserIdFromRequest(request);
    if (file) {
      return this.galleryService.saveImage(file, userId);
    } else {
      throw new BadRequestException('No image was provided');
    }
  }

  @Get('image/:imageName')
  async getGalleryImage(@Param('imageName') imageName: string, @Res() res) {
    const imgPath = environment.images_folder + '/' + imageName;
    return res.sendFile(imgPath, { root: 'uploads' });
  }

  @Get('thumb/:thumbName')
  async getGalleryImageThumbnail(
    @Param('thumbName') thumbName: string,
    @Res() res
  ) {
    const imgPath = environment.thumbs_folder + '/thumb-' + thumbName;
    return res.sendFile(imgPath, { root: 'uploads' });
  }
}
