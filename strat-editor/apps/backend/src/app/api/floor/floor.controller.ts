import { Controller, Get, Param, Res } from '@nestjs/common';
import { environment } from '../../../environments/environment.prod';
import { FloorService } from './floor.service';

@Controller('floor')
export class FloorController {
  constructor(private readonly floorService: FloorService) {}

  @Get('image/:imageName')
  async getFloorImage(@Param('imageName') imageName: string, @Res() res) {
    const imgPath = this.getImgPath(imageName);
    console.log(imgPath);
    return res.sendFile(imgPath, { root: 'assets' });
  }

  private getImgPath(imageName): string {
    return (
      environment.floor_folder + '/' + imageName + environment.floor_extensions
    );
  }
}
