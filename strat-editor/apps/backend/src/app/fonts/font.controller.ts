import { Controller, Get, Param, Res } from '@nestjs/common';
import { environment } from '../../environments/environment.prod';
import { FontService } from './font.service';

@Controller('font')
export class FontController {
  constructor(private readonly fontService: FontService) {}

  @Get('file/:fontName')
  async getIconBadge(@Param('fontName') fontName: string, @Res() res) {
    const fontPath = this.getFontPath(fontName);
    return res.sendFile(fontPath, { root: 'assets' });
  }

  @Get('all')
  async getAllFontNames(): Promise<string[]> {
    return this.fontService.getAllFontNames();
  }

  private getFontPath(fontName): string {
    return environment.font_folder + '/' + fontName;
  }
}
