import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import {  Floor } from '@strat-editor/data';
import { environment } from '../../environments/environment.prod';
import { FloorService } from './floor.service';

@Controller("floor")
export class FloorController {
  constructor(private readonly floorService:  FloorService) {}

  @Get("all")
  async findAll() : Promise< Floor[]> {
    return this.floorService.findAll();
  }

  @Get("image/:imageName")
  async getFloorImage(@Param("imageName") imageName : string, @Res() res) {
    const imgPath = this.getImgPath(imageName);
    console.log(imgPath)
    return res.sendFile(imgPath, { root: "assets" });
  }

  @Post()
  async addFloor(@Body() floor : Floor){
    this.floorService.addFloor(floor);
  }

  private getImgPath(imageName) : string{
    return environment.floor_folder + "/" + imageName + environment.floor_extensions;
  }
}
