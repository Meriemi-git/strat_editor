import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { environment } from '../../environments/environment.prod';

@Controller('icon')
export class IconController {
  @Get('image/:iconname')
  async getIconBadge(@Param('iconname') iconname: string, @Res() res) {
    const imgPath = this.getImgPath(iconname);
    return res.sendFile(imgPath, { root: 'assets' });
  }

  private getImgPath(svgName): string {
    return environment.icon_folder + '/' + svgName + environment.icon_extension;
  }
}
