import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Map } from '@strat-editor/data';
import { environment } from '../../environments/environment.prod';
import { MapService } from './map.service';

@Controller("map")
export class MapController {
  constructor(private readonly mapService:  MapService) {}

  @Get("all")
  async findAll() : Promise<Map[]> {
    return this.mapService.findAll();
  }

  @Get("image/:imageName")
  async getMapImage(@Param("imageName") imageName : string, @Res() res) {
    const imgPath = this.getImgPath(imageName);
    console.log(imgPath)
    return res.sendFile(imgPath, { root: "assets" });
  }

  @Post()
  async addMap(@Body() map : Map){
    this.mapService.addMap(map);
  }

  private getImgPath(imageName) : string{
    return environment.map_folder + "/" + imageName + environment.map_extensions;
  }
}
