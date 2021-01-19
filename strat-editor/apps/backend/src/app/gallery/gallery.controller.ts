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
import { AuthGuard } from '@nestjs/passport';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @UseGuards(AuthGuard('ConfirmedStrategy'))
  @Post('images')
  allImages(@Body() userId): Promise<string[]> {
    return this.galleryService.getAllImagesForUser(userId);
  }

  @UseGuards(AuthGuard('ConfirmedStrategy'))
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  uploadFile(@UploadedFile() file) {
    console.log('file', file);
  }
}
