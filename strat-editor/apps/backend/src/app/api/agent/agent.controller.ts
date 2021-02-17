import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Agent } from '@strat-editor/data';
import { environment } from '../../../environments/environment.prod';
import { AgentService } from './agent.service';
import { Response } from 'express';
@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Get('all')
  async findAll(): Promise<Agent[]> {
    return this.agentService.findAll();
  }

  @Get('badge/:imageName')
  async getAgentBadge(
    @Param('imageName') imageName: string,
    @Res() res: Response
  ) {
    const imgPath = this.getImgPath(imageName);
    return res.sendFile(imgPath, { root: 'assets' });
  }

  @Post()
  async addAgent(@Body() agent: Agent): Promise<Agent> {
    return this.agentService.addAgent(agent);
  }

  private getImgPath(imageName): string {
    return (
      environment.badges_folder + '/' + imageName + environment.badge_extension
    );
  }
}
