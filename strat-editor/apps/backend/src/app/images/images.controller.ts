import { Controller, Get, Param, Res } from '@nestjs/common';
import { environment } from '../../environments/environment.prod';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}
}
