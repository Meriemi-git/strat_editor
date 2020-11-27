import { Body, Controller, Get, Post } from '@nestjs/common';
import { Agent, AgentDto } from '@strat-editor/models';

import { AgentService } from './agent.service';

@Controller()
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Get("agents")
  getData() {
    return this.agentService.getAgents();
  }

  @Post("agent")
  addAgent(@Body() dto : AgentDto) : Agent{
    return this.agentService.addAgent(dto);
  }
}
