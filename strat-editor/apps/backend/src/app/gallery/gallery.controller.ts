import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @UseGuards(JwtAuthGuard)
  @Post('images')
  allImages(@Body() userId): Promise<string[]> {
    return this.galleryService.getAllImagesForUser(userId);
  }

  //@UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  uploadFile(@UploadedFile() file) {
    console.log('file', file);
  }
}
