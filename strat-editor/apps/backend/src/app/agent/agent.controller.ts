import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Agent } from '@strat-editor/data';
import { environment } from '../../environments/environment.prod';
import { AgentService } from './agent.service';

@Controller("agent")
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Get("all")
  async findAll() : Promise<Agent[]> {
    return this.agentService.findAll();
  }

  @Get("badge/:imageName")
  async getAgentBadge(@Param("imageName") imageName : string, @Res() res) {
    const imgPath = this.getImgPath(imageName);
    return res.sendFile(imgPath, { root: "assets" });
  }

  @Post()
  async addAgent(@Body() agent : Agent){
    this.agentService.addAgent(agent);
  }

  private getImgPath(imageName) : string{
    return environment.badges_folder + "/" + imageName + environment.badge_extension;
  }
}
