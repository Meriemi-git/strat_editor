import { Body, Controller, Post } from '@nestjs/common';
import { GalleryService } from './gallery.service';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post('images')
  allImages(@Body() userId): Promise<string[]> {
    return this.galleryService.getAllImagesForUser(userId);
  }
}
