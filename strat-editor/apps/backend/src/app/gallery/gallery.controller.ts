import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GalleryService } from './gallery.service';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @UseGuards(JwtAuthGuard)
  @Post('images')
  allImages(@Body() userId): Promise<string[]> {
    return this.galleryService.getAllImagesForUser(userId);
  }
}
