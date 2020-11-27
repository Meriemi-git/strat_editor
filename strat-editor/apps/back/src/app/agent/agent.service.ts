import { Injectable } from '@nestjs/common';
import { Agent, AgentDto } from '@strat-editor/models';

@Injectable()
export class AgentService {

  agents : Agent[] = [{id:0,name : "Castle", imgUrl : "http://google.com"},{id:1,name : "Valkyrie", imgUrl : "http://google.com"}]

  getAgents(): Agent[] {
    return this.agents;
  }

  addAgent(dto : AgentDto) : Agent {
    const agent : Agent = {
      id : -1,
      name : dto.name,
      imgUrl : dto.imgUrl
    }
    this.agents.push(agent);
    return agent
  }
}
