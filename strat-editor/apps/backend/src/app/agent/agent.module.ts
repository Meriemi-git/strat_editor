import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AgentController } from './agent.controller';
import { AgentService } from './agent.service';
import { AgentSchema } from '@strat-editor/data';

@Module({
  imports: [MongooseModule.forFeature([{ name: "Agent", schema: AgentSchema }])],
  controllers: [AgentController],
  providers: [AgentService],
})
export class AgentModule {}
