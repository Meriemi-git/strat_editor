import { Body, Controller, Get, Post } from '@nestjs/common';
import { Agent, AgentDto } from '@strat-editor/data';
import { AgentService } from './agent.service';

@Controller()
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Get("agents")
  async findAll() : Promise<Agent[]> {
    return this.agentService.findAll();
  }

  @Post("agent")
  async addAgent(@Body() dto : AgentDto){
    this.agentService.addAgent(dto);
  }
}
